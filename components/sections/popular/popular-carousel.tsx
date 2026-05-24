import { cn } from "@/lib/utils"
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react"
import { CustomCursor } from "./custom-cursor";
import Link from "next/link";

const PopularCarousel = ({ className, nfts }: { className?: string, nfts: NFT[] }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [showCustomCursor, setShowCustomCursor] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e
      ? e.touches[0].clientX
      : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const endX = 'changedTouches' in e
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;
    const swipeThreshold = 50;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => {
      if (carouselRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVisible && !isDragging) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === nfts.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, nfts.length, isDragging]);

  const handlePrevClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? nfts.length - 1 : prevIndex - 1
    );
  }, [nfts.length]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === nfts.length - 1 ? 0 : prevIndex + 1
    );
  }, [nfts.length]);

  const getTransform = (index: number) => {
    const position = index - currentIndex;
    const translateX = position * 470;
    return translateX;
  };

  return (
    <div
      className={cn(
        "relative w-full mx-auto p-4 py-10 pt-14 z-1 select-none",
        className
      )}
      ref={carouselRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      <div className="relative overflow-hidden">
        <div className="h-[500px] relative">
          <div className={cn("absolute inset-0 flex items-center justify-center", showCustomCursor ? "cursor-none" : "")}>
            <CustomCursor isVisible={showCustomCursor} />
            {nfts.map((item, index) => (
              <Link
                key={index}
                href={`/${item.hash}`}
                style={{
                  transform: `translateX(${getTransform(index)}px)`,
                  position: 'absolute',
                  transition: 'all 500ms ease-in-out',
                }}
                className={cn(
                  "flex items-center justify-center rounded-lg transition-all duration-200 ease-in cursor-none",
                  index === currentIndex ? 'w-[92vw] md:w-[450px] lg:w-[480px]' : 'w-[450px]',
                  index === currentIndex ? 'h-full' : 'h-[75%]',
                  index === currentIndex ? 'z-10' : 'z-0'
                )}
                onMouseEnter={() => setShowCustomCursor(true)}
                onMouseLeave={() => setShowCustomCursor(false)}
              >
                <div
                  className={cn(
                    "relative text-4xl font-bold text-white bg-foreground/60 backdrop-blur-lg rounded-[0.7rem]  w-full h-full m-6 flex items-center justify-center",
                    index === currentIndex ? 'shadow-xl' : 'shadow-md'
                  )}
                >
                  <Image
                    src={item.imageURI}
                    alt={item.name}
                    fill
                    onLoad={(event) => {
                      const img = event.target as HTMLImageElement;
                      img.classList.remove('opacity-0');
                    }}
                    className={cn(
                      "object-cover rounded-[0.7rem] p-[3px] transition-opacity duration-300",
                      "opacity-0"
                    )}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-1 pt-20">
        {nfts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "p-2 w-auto h-auto rounded-full transition-all shrink-0 duration-100 ease-in-out font-bold font-khand text-[18px] text-foreground/70",
              index === currentIndex ? '' : 'hover:bg-foreground/20 ',
              ""
            )}
          >
            {index + 1 === currentIndex + 1 ? '_' : index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PopularCarousel
