import Link from "next/link";
import Image from "next/image";

const NFTCard = ({ item }: { item: NFT }) => {
  return (
    <div key={item.id} className="group/dcard">
      <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/60 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-900/30">
        
        {/* Image container - INCREASED SIZE */}
        <div className="relative h-[340px] w-full overflow-hidden flex items-center justify-center bg-black/10">
          <Image
            src={item.imageURI}
            alt={item.name}
            width={340}
            height={340}
            className="object-contain object-center w-full h-full p-3 group-hover/dcard:scale-110 transition-transform duration-700"
            priority={false}
          />
          {/* Reduced gradient overlay opacity to show more image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Card content - REDUCED SIZE */}
        <div className="p-4 bg-gradient-to-b from-gray-900/90 to-black/90 flex flex-col justify-between flex-grow">
          <div className="mb-3">
            {/* Reduced font sizes and line heights */}
            <h3 className="text-base font-bold text-white mb-1.5 line-clamp-2 min-h-[40px]">
              {item.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 truncate max-w-[50%]">
                {item.chain}
              </span>
              {item.price > 0 ? (
                <span className="text-base font-bold text-white">
                  {item.price} {item.symbol}
                </span>
              ) : (
                <span className="text-base font-bold text-white">
                  Free
                </span>
              )}
            </div>
          </div>

          {/* Mint button - Slightly smaller */}
          <Link 
            href={`/${item.hash}`}
            className="block w-full group/btn mt-2"
          >
            <div className="relative overflow-hidden rounded-xl">
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover/btn:opacity-30 transition-opacity duration-300" />
              
              {/* Button content - Reduced padding */}
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 rounded-xl text-center text-sm group-hover/btn:from-purple-700 group-hover/btn:to-pink-700 transition-all duration-300">
                Mint
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-xl" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;