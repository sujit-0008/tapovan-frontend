"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useActiveCommonMessage } from "@/app/hooks/useCommonMessage";
import { ActiveCommonMessageResponse } from "@/app/types/commonMessage";

const STORAGE_KEY = "tn_lastDismissedCommonMessageId";

export default function AnnouncementBar() {
  const { data, isLoading } = useActiveCommonMessage();
  const message = (data as ActiveCommonMessageResponse) ?? null;
  const [dismissedId, setDismissedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setDismissedId(parseInt(stored, 10));
    } catch {}
  }, []);

  // Reveal banner again if a new message id arrives
  useEffect(() => {
    if (!message) return;
    if (dismissedId !== null && dismissedId !== message.id) {
      setDismissedId(null);
    }
  }, [message, dismissedId]);

  const hidden = useMemo(() => {
    if (!message) return true;
    if (dismissedId == null) return false;
    return dismissedId === message.id;
  }, [message, dismissedId]);

  const duration = useMemo(() => {
    if (!message) return 20;
    const len = (message.content || '').length;
    return Math.max(12, Math.min(40, Math.round(len / 3)));
  }, [message]);

  if (isLoading || hidden || !message) return null;

  const handleDismiss = () => {
    try {
      if (message) {
        localStorage.setItem(STORAGE_KEY, String(message.id));
        setDismissedId(message.id);
      }
    } catch {}
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="w-full bg-yellow-100 text-yellow-900 border-b border-yellow-200"
      style={{ maxHeight: 96, overflow: "hidden" }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="relative py-2 sm:py-3 flex items-center">
          <div className="overflow-hidden w-full pr-10">
            <div
              className="whitespace-nowrap font-medium text-sm sm:text-base leading-6"
              style={{
                animation: `marquee ${duration}s linear infinite`,
                willChange: 'transform',
              }}
            >
              {message.content}
            </div>
          </div>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={handleDismiss}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-yellow-900/70 hover:text-yellow-900 focus:outline-none"
          >
            ❌
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
