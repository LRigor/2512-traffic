import Image from "next/image";

interface ShareButton {
  imagePath: string;
  ariaLabel: string;
  imageWidth: number;
  imageHeight: number;
}

const shareButtons: ShareButton[] = [
  {
    imagePath: "/facebook-icon.svg",
    ariaLabel: "Share on Facebook",
    imageWidth: 24,
    imageHeight: 24,
  },
  {
    imagePath: "/linkedin-icon.svg",
    ariaLabel: "Share on LinkedIn",
    imageWidth: 24,
    imageHeight: 24,
  },
  {
    imagePath: "/x-icon.svg",
    ariaLabel: "Share on X",
    imageWidth: 20,
    imageHeight: 20,
  },
  {
    imagePath: "/whatsapp-icon.svg",
    ariaLabel: "Share on WhatsApp",
    imageWidth: 20,
    imageHeight: 20,
  },
];

export default function Share() {
  return (
    <div className="mb-12">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Share</h3>
      <div className="flex gap-2">
        {shareButtons.map((button, index) => (
          <button
            key={index}
            className="w-10 h-10"
            aria-label={button.ariaLabel}
          >
            <Image
              src={button.imagePath}
              alt={button.ariaLabel}
              width={button.imageWidth}
              height={button.imageHeight}
              className={button.imageWidth === 24 ? "h-6 w-6" : "h-5 w-5"}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
