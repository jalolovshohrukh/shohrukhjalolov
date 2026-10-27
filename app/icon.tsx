import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/BrandMark";

// 96px (a multiple of 48, as Google asks for search-result favicons).
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<BrandMark size={size.width} />, { ...size });
}
