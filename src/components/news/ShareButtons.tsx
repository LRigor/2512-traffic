"use client";

import { useCallback } from "react";
import Image from "next/image";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

interface SharePlatform {
  name: string;
  imagePath: string;
  ariaLabel: string;
  imageWidth: number;
  imageHeight: number;
  getShareUrl: (url: string, title: string, description?: string) => string;
}

const sharePlatforms: SharePlatform[] = [
  {
    name: "Facebook",
    imagePath: "/facebook-icon.svg",
    ariaLabel: "Share on Facebook",
    imageWidth: 24,
    imageHeight: 24,
    getShareUrl: (url, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    imagePath: "/linkedin-icon.svg",
    ariaLabel: "Share on LinkedIn",
    imageWidth: 24,
    imageHeight: 24,
    getShareUrl: (url, title, description) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(description || title)}`,
  },
  {
    name: "X",
    imagePath: "/x-icon.svg",
    ariaLabel: "Share on X (Twitter)",
    imageWidth: 20,
    imageHeight: 20,
    getShareUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "WhatsApp",
    imagePath: "/whatsapp-icon.svg",
    ariaLabel: "Share on WhatsApp",
    imageWidth: 20,
    imageHeight: 20,
    getShareUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
];

/**
 * ShareButtons component for social media sharing.
 * Opens share dialogs in new windows with proper security attributes.
 */
export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  const handleShare = useCallback(
    (platform: SharePlatform) => {
      const shareUrl = platform.getShareUrl(url, title, description);
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    },
    [url, title, description]
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  }, [url]);

  return (
    <div className="flex flex-col gap-4 py-6 border-t border-b border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
        Share this article
      </h3>
      <div className="flex items-center gap-3">
        {sharePlatforms.map((platform) => (
          <button
            key={platform.name}
            type="button"
            onClick={() => handleShare(platform)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={platform.ariaLabel}
          >
            <Image
              src={platform.imagePath}
              alt=""
              width={platform.imageWidth}
              height={platform.imageHeight}
              className={platform.imageWidth === 24 ? "h-6 w-6" : "h-5 w-5"}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="Copy article link"
          title="Copy link"
        >
          <svg
            className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
