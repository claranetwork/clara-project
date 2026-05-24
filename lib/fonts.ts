import {
  PT_Sans_Caption,
  Gudea,
  Alef,
  Audiowide,
  Khand,
} from "next/font/google";

export const ptSansCaption = PT_Sans_Caption({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans-caption",
});

export const gudea = Gudea({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gudea",
});

export const alef = Alef({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-alef",
});

export const audioWide = Audiowide({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-audio-wide",
});

export const khand = Khand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-khand",
});
