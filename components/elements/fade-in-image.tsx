"use client"

import React from 'react';
import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';

interface FadeInImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  opacity?: number;
  quality?: number;
  className?: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  setLoading,
  opacity = 1,
  quality = 100,
  ...props
}) => {

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      quality={quality}
      onLoad={(event) => {
        const img = event.target as HTMLImageElement;
        img.classList.remove('opacity-0');
        img.style.opacity = opacity.toString();
        setLoading?.(true);
      }}
      className={cn(
        "opacity-0 transition duration-700",
        className
      )}
      {...props}
    />

  );
};

export default FadeInImage;
