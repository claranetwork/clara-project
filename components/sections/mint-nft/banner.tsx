import { Grid } from '@/components/elements'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function AdBanner({ nft }: { nft: NFT }) {
  return (
    <div className='group relative overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <Link href={`/${nft.hash}`}>
        <Grid className="relative grid-cols-1 lg:grid-cols-3 items-center gap-6 bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40 rounded-xl backdrop-blur-sm p-6 hover:border-purple-500/60 transition-all duration-300">
          
          {/* Left text content */}
          <div className='lg:col-span-2'>
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 w-fit">
                <span className="text-xs font-semibold text-purple-300">#{nft.hash}</span>
              </div>
              
              <h3 className='text-xl md:text-2xl font-bold text-white leading-tight'>
                Claim <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{nft.name}</span>
              </h3>
              
              <p className='text-gray-400 text-base hidden lg:block'>
                Own a Piece of the Digital Revolution!
              </p>
            </div>
          </div>

          {/* Image gallery - Compact version */}
          <div className='flex justify-center lg:justify-end'>
            <div className='relative flex items-center h-[120px] md:h-[140px]'>
              {/* First image */}
              <div className='hidden md:block absolute -left-12 -rotate-12 opacity-70'>
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-500/30">
                  <Image 
                    src={nft.imageURI} 
                    alt={nft.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Main image */}
              <div className='relative z-10 rotate-0 shadow-lg shadow-purple-900/30'>
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-purple-500/50">
                  <Image 
                    src={nft.imageURI} 
                    alt={nft.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Third image */}
              <div className='hidden lg:block absolute -right-12 rotate-12 opacity-70'>
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-500/30">
                  <Image 
                    src={nft.imageURI} 
                    alt={nft.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </Grid>
      </Link>
    </div>
  )
}

export default AdBanner