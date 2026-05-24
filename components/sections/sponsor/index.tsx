import { Flex } from "@/components/elements"
import { SponsorSlide } from "./sponsor-slide"
import { H2, H3, P } from "@/components/typo"

const SponsorSection = () => {
  return (
    <section className="">
      <Flex className='flex-col items-center px-[var(--base-spacing)] xl:py-10'>
        <H2 className='text-center text-[28px] sr-only'>BlockChain & Partners:</H2>
        <SponsorSlide />
      </Flex>
    </section>
  )
}

export default SponsorSection
