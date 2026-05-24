import { Metadata } from 'next'
import nftsData from "@/configs/nfts.json";
import MintSection from "@/components/sections/mint-nft";
import AdBanner from "@/components/sections/mint-nft/banner";
import Image from 'next/image';

type ParamType = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: ParamType): Promise<Metadata> => {
  const { id } = await params
  const nfts: NFT[] = nftsData
  const nft = nfts.find((nft) => nft.hash === id)

  return {
    title: nft ? `${nft.name} | Clara` : 'Clara',
  }
}

const Page = async ({ params }: ParamType) => {
  const { id } = await params

  const nfts: NFT[] = nftsData

  const nft = nfts.find((nft) => nft.hash === id)
  const linkNft = nft ? nfts.find((item) => item.hash === nft.linkTo) : null

  if (!nft) return

  return (
    <main className="w-full flex flex-col relative  justify-center md:-mt-16 py-16">
      <div className="overflow-hidden w-full h-full absolute inset-0">
        <Image
          src="/images/Ellipse6.svg"
          alt="Hero Background"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[5%] -translate-y-1/2  object-contain opacity-80 right-[5%] translate-x-1/2 -z-10"
        />
        <Image
          src="/images/Ellipse7.svg"
          alt="Hero Background 2"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[30%] md:top-[15%] object-contain opacity-80 left-0 -translate-x-1/2 -z-10 h-[90%]"
        />
      </div>
      <MintSection nft={nft} />
      {linkNft &&
        <div className="section-padding">
          <AdBanner nft={linkNft} />
        </div>
      }
    </main>
  )
}

export default Page