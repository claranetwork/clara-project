/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  assets: any[];
  layers: any[];
}

interface LottieHoverAnimationProps {
  animationData: LottieAnimationData;
  width?: string | number;
  height?: string | number;
  className?: string;
  speed?: number;
  loop?: boolean;
  isHovered?: boolean
}

const LottieIcon: React.FC<LottieHoverAnimationProps> = ({
  animationData,
  width = '28px',
  height = '28px',
  className = '',
  speed = 1,
  loop = true,
  isHovered
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: false,
      animationData,
    });

    if (animationRef.current) {
      animationRef.current.setSpeed(speed);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [animationData, loop, speed]);

  const play = (): void => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  const pause = (): void => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  useEffect(() => {
    if (isHovered) {
      play()
    } else {
      pause()
    }

  }, [isHovered])

  return (
    <div
      ref={containerRef}
      style={{ width, height }}
      className={className}
    />
  );
};

export default LottieIcon
