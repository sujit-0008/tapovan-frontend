
'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, CameraOff, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const startScanning = async () => {
      try {
        setIsLoading(true);
        setError(null);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          animationFrameId = requestAnimationFrame(tick);
        }
      } catch (error) {
        console.error('Camera access error:', error);
        setError('Could not access camera. Please check permissions.');
      } finally {
        setIsLoading(false);
      }
    };

    const tick = () => {
      console.log('Scanning frame, ID:', animationFrameId);
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
          canvas.height = videoRef.current.videoHeight;
          canvas.width = videoRef.current.videoWidth;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code && code.data) {
            onScan(code.data);
            setIsScanning(false);
            return; // Stop the loop
          }
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    if (isScanning) {
      startScanning();
    }

    // This is the cleanup function. It runs when the effect is "cleaned up".
    // (e.g., when `isScanning` changes from true to false, or when the component unmounts)
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameId) {
        console.log('Cancelling animation frame, ID:', animationFrameId);
        cancelAnimationFrame(animationFrameId);
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
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          <video ref={videoRef} className="w-full h-auto rounded-xl border-4 border-gray-300" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-60 h-60 border-4 border-hostel-gold rounded-lg opacity-75 animate-pulse" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
}
