
'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, LoaderCircle } from 'lucide-react';
import jsQR from 'jsqr';
import { Button } from './ui/button';

interface QRScannerProps {
  onScan: (data: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    const startScanning = async () => {
      try {
        setIsLoading(true);
        setError(null);
        scannedRef.current = false;

        // Request camera with optimized constraints for both desktop and mobile
        const constraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
            // Add focus mode for better scanning
            focusMode: 'continuous' as any,
          },
          audio: false,
        };

        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
          
          // Ensure video plays on mobile (playsinline is critical for iOS)
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.setAttribute('autoplay', 'true');
          videoRef.current.setAttribute('muted', 'true');
          
          // Wait for video to be ready before starting scan
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch((err) => {
              console.error('Play error:', err);
              setError('Failed to start video playback');
            });
            if (animationFrameIdRef.current === null) {
              animationFrameIdRef.current = requestAnimationFrame(tick);
            }
          };
        }
      } catch (error: any) {
        console.error('Camera access error:', error);
        
        // Provide specific error messages
        if (error.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access in settings.');
        } else if (error.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else if (error.name === 'NotReadableError') {
          setError('Camera is already in use by another application.');
        } else if (error.name === 'SecurityError') {
          setError('Camera access requires HTTPS connection.');
        } else {
          setError('Could not access camera. Please check permissions.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const tick = () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
        !scannedRef.current
      ) {
        const context = canvasRef.current.getContext('2d', { willReadFrequently: true });

        if (context) {
          // Set canvas dimensions to match video
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;

          // Draw video frame to canvas
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

          try {
            const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Try with inversion attempts enabled for better detection
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'attemptBoth',
            });

            if (code && code.data) {
              scannedRef.current = true;
              onScan(code.data);
              setIsScanning(false);
              return;
            }
          } catch (err) {
            console.error('QR scanning error:', err);
          }
        }
      }

      if (isScanning && !scannedRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(tick);
      }
    };

    if (isScanning) {
      startScanning();
    }

    return () => {
      // Cleanup: stop all tracks and cancel animation frame
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        mediaStreamRef.current = null;
      }
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [isScanning, onScan]);

  const handleButtonClick = () => {
    if (isScanning) {
      setIsScanning(false);
    } else {
      setIsScanning(true);
      setError(null);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Camera className="mr-2 h-4 w-4" />
        )}
        {isScanning ? 'Stop Scanning' : isLoading ? 'Starting Camera...' : 'Scan QR Code'}
      </Button>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <CameraOff className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
      {isScanning && !error && (
        <div className="relative w-full max-w-md mx-auto">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-xl border-4 border-gray-300"
            style={{ aspectRatio: '4/3' }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-60 h-60 border-4 border-hostel-gold rounded-lg opacity-75 animate-pulse" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
