"use client"

import gsap from "gsap"
import Image from "next/image"
import { Send } from "lucide-react"
import { useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { ContactForm } from "./form"
import { H2, H3 } from "@/components/typo"
import { Flex, Grid } from "@/components/elements"
import { FadeIn } from "@/components/animated/fade-in"

gsap.registerPlugin(ScrollTrigger)

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gradientRef = useRef<HTMLSpanElement>(null)
  const gradientRef2 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (sectionRef.current && gradientRef.current && gradientRef2.current) {
      gsap.fromTo(
        gradientRef.current,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        },
      )
      gsap.fromTo(
        gradientRef2.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  return (
    <section id="contact" className="py-16 section-padding" ref={sectionRef}>
      <div className="group relative gap-14 bg-red-400 rounded-lg p-[2px] overflow-hidden">
        <span
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-br from-foreground to-secondary opacity-100 group-hover:opacity-100 transition-opacity duration-300 rounded-[0.5rem]" />
        <span className="absolute inset-0 bg-gradient-to-br from-secondary to-foreground opacity-0 group-hover:opacity-0 transition-opacity duration-300 ease-in rounded-[0.5rem]" ref={gradientRef2} />
        <Image
          src="/images/Ellipse3.svg"
          alt="Popular Background 1"
          width={568}
          height={602}
          quality={100}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-80 object-contain bg-transparent"
        />
        <Grid className="relative lg:grid-cols-[45%_1fr] items-center gap-4 bg-background/80 rounded-lg backdrop-blur-lg h-full p-8 md:p-12 lg:p-16">
          <div className="space-y-2 lg:w-[80%]">
            <Flex className="gap-3 items-center -mt-2">
              <FadeIn delay={0.2} direction="right">
                <Send className="size-3 md:size-4" />
              </FadeIn>
              <H2 className="text-left text-[14px] md:text-[18px] font-audio-wide uppercase mt-2">Contact</H2>
            </Flex>
            <FadeIn direction="up">
              <H3 className="text-left text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[44px] 2xl:text-[50px] leading-[1.4] uppercase font-audio-wide">Get in touch with us</H3>
            </FadeIn>
          </div>
          <div className="space-y-6">
            <ContactForm />
          </div>
        </Grid>
      </div>
    </section>
  )
}

export default ContactSection


