"use client";
import { useState, useRef, useEffect } from "react";
import NFTCard from "./card";

// Persist "See More" expansion across in-tab navigation (e.g. visit an
// NFT detail page → back → see the same expanded grid). Clears when the
// tab closes.
const STORAGE_KEY = "discover-items-to-show";

function readStoredCount(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

function responsiveDefault(): number {
  if (typeof window === "undefined") return 8;
  if (window.innerWidth < 768) return 4;
  if (window.innerWidth < 1024) return 6;
  return 8;
}

export default function AnimatedCategoryList({ items }: { items: NFT[] }) {
  const [itemsToShow, setItemsToShow] = useState(0); // Start with 0, we'll set initial value in useEffect
  const [hasInitialized, setHasInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize items to show ONCE on mount — prefer a previously saved
  // count (from sessionStorage) so back-navigation restores the grid.
  useEffect(() => {
    if (hasInitialized) return;

    const calculateInitialItems = () => {
      const stored = readStoredCount();
      const fallback = responsiveDefault();
      // Never start below the responsive default, and never above what we have.
      const target = Math.min(Math.max(stored ?? fallback, fallback), items.length);
      setItemsToShow(target);
      setHasInitialized(true);
    };

    calculateInitialItems();

    // Only handle resize for initial calculation, not for resetting
    const handleResize = () => {
      if (!hasInitialized) {
        calculateInitialItems();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasInitialized, items.length]);

  // Persist whenever the count changes (post-init).
  useEffect(() => {
    if (!hasInitialized) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, String(itemsToShow));
    } catch {
      // sessionStorage may throw in private modes — fail silently.
    }
  }, [itemsToShow, hasInitialized]);

  // Load more function - simply adds more items
  const handleLoadMore = () => {
    let increment = 4; // Default for mobile
    if (window.innerWidth >= 1024) increment = 8;
    else if (window.innerWidth >= 768) increment = 6;

    setItemsToShow(prev => Math.min(prev + increment, items.length));
  };

  const itemsToDisplay = items.slice(0, itemsToShow);
  const hasMoreItems = items.length > itemsToShow;

  // Don't render until we have initialized
  if (!hasInitialized) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-900/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
        {itemsToDisplay.map((item) => (
          <NFTCard item={item} key={item.id} />
        ))}
      </div>

      {/* Clean Load More Button */}
      {hasMoreItems && (
        <div className="mt-8 w-full max-w-md px-4">
          <button
            onClick={handleLoadMore}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-base"
          >
            See More NFTs
          </button>
        </div>
      )}
      
      {/* End of list message */}
      {!hasMoreItems && items.length > 0 && (
        <div className="mt-8 text-center text-gray-500">
          All NFTs loaded
        </div>
      )}
    </div>
  );
}