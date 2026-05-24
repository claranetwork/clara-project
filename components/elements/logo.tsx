import Image from 'next/image'
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => (
  <div className="relative h-[45px] w-[120px] sm:w-[160px]">
    <Image
      src={"/images/logo2.png"}
      fill
      alt="logo"
      quality={100}
      className={cn(
        "object-contain",
        className
      )}
      priority
    />
  </div>
)

export default Logo


// import { cn } from '@/lib/utils'

// const Logo = ({ className }: { className?: string }) => (
//   <div className={cn("flex items-center space-x-3 group", className)}>
//     {/* Logo symbol */}
//     <div className="relative">
//       {/* Glow effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 -z-10"></div>
      
//       {/* Main logo */}
//       <div className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-600/40 group-hover:shadow-purple-600/60 transition-shadow duration-300">
//         <span className="text-white font-bold text-2xl">C</span>
//       </div>
      
//       {/* Corner accents */}
//       <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
//       <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"></div>
//     </div>
    
//     {/* Text - Only "Clara" */}
//     <div className="flex flex-col">
//       <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
//         Clara
//       </span>
//     </div>
//   </div>
// )

// export default Logo