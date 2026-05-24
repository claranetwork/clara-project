"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';

export const SponsorSlide = () => {

  const slides =
    [
      "/images/sponsor/sponsor1.png",
      "/images/sponsor/sponsor2.png",
      "/images/sponsor/sponsor3.png",
      "/images/sponsor/sponsor4.png",
      "/images/sponsor/sponsor1.png",
      "/images/sponsor/sponsor2.png",
      "/images/sponsor/sponsor3.png",
      "/images/sponsor/sponsor4.png",
    ]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true
    },
    [AutoScroll({ playOnInit: false })]
  );

  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const startAutoPlay = useCallback(() => {
    if (emblaApi && isInView) {
      const autoScroll = emblaApi.plugins().autoScroll;
      if (!autoScroll) return;
      autoScroll.play();
    }
  }, [emblaApi, isInView]);

  const stopAutoPlay = useCallback(() => {
    if (emblaApi) {
      const autoScroll = emblaApi.plugins().autoScroll;
      if (!autoScroll) return;
      autoScroll.stop();
    }
  }, [emblaApi]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  }, [isInView, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = useCallback(() => {
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (isInView) {
      startAutoPlay();
    }
  }, [isInView, startAutoPlay]);

  return (
    <div
      className="w-full my-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-[10%] z-10 pointer-events-none bg-gradient-to-r from-background via-background/80 to-transparent"></div>

        <div className="absolute inset-y-0 right-0 w-[10%] z-10 pointer-events-none bg-gradient-to-l from-background via-background/80 to-transparent"></div>
        <div className="overflow-hidden rounded-lg opacity-90" ref={emblaRef}>
          <div className="flex">
            {slides.map((item, index) => (
              <div key={index} className="flex-[0_0_50%] sm:flex-[0_0_35%] md:flex-[0_0_28%] lg:flex-[0_0_22%] xl:flex-[0_0_16%] min-w-0">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="aspect-video flex items-center justify-center p-4 lg:p-6 w-max">
                    <Image src={item} width={130} height={40} alt="sponsor" className="text-4xl font-bold object-contain" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div >
    </div >
  );
};
