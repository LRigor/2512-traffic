import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import Button from "../Button";

interface ImageButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  imagePath: string;
  text: string | number;
  variant?: "primary" | "secondary" | "danger";
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export default function ImageButton({
  imagePath,
  text,
  variant = "primary",
  className = "",
  imageAlt = "",
  imageWidth = 16,
  imageHeight = 16,
  ...props
}: ImageButtonProps) {
  return (
    <Button
      variant={variant}
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <Image src={imagePath} alt={imageAlt} width={imageWidth} height={imageHeight} />
      <span>{text}</span>
    </Button>
  );
}

