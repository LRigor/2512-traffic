"use client";

import ImageButton from "../ui/ImageButton";
import { getOpenToolsBadge } from "@/utils/getOpenToolsBadge";
import { useToast } from "@/contexts/ToastContext";

interface OpenToolsBadgeProps {
  favouriteCount: number;
  slug: string;
}

export default function OpenToolsBadge({
  favouriteCount,
  slug,
}: OpenToolsBadgeProps) {
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      const badgeSvg = getOpenToolsBadge(favouriteCount, slug);
      await navigator.clipboard.writeText(badgeSvg);
      showToast("Badge copied to clipboard!", "success");
    } catch (err) {
      showToast("Failed to copy badge", "failed");
      console.error("Failed to copy badge:", err);
    }
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: getOpenToolsBadge(favouriteCount, slug),
        }}
      />
      <ImageButton
        imagePath="/copy.svg"
        text="Copy Code"
        variant="danger"
        imageAlt="Copy"
        onClick={handleCopy}
        className="-ml-12"
      />
    </>
  );
}
