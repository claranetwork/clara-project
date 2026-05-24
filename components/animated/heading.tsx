'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  className?: string,
  text: string
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ className, text }) => {
  const textwords = text.split(' ')
  const headingWords = useRef<HTMLHeadingElement>(null)
  const highlightWord = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline()

      if (headingWords.current) {
        const words = text.split(' ').slice(1)
        gsap.set([headingWords.current, highlightWord.current], { opacity: 1 })
        headingWords.current.innerHTML = ''

        words.forEach((word, index) => {
          const span = document.createElement('span')
          span.innerHTML = word + '&nbsp;'
          span.style.opacity = '0'
          span.style.display = 'inline-block'
          headingWords.current?.appendChild(span)

          timeline.to(span, {
            opacity: 1,
            duration: 0.6,
            ease: 'power4.out'
          }, index * 0.25)
        })
      }

      if (highlightWord.current) {
        timeline.from(highlightWord.current, {
          opacity: 0,
          y: 20,
          duration: 0.25,
          ease: 'power4.inOut'
        }, '-=0.25')
          .to(highlightWord.current, {
            opacity: 1,
            rotate: 0,
            duration: 0.25,
            ease: 'power4.in',
          })
      }
    })
    return () => ctx.revert()

  }, [text])

  return (
    <div className="inline-block">
      <h1 className='flex flex-col justify-center items-center lg:items-start gap-3'>
        <span className=" inline-block w-max p-1 2xl:p-2 bg-foreground/20 text-white px-4 2xl:px-6 rounded-xl 2xl:mb-2 scroll-m-20 text-center lg:text-left text-[32px] sm:text-[36] md:text-[40px] lg:text-[44px] xl:text-[48px] 2xl:text-[60px] leading-[1.3] font-audio-wide opacity-0 -rotate-[2deg]" ref={highlightWord}>
          {textwords[0]}
        </span>
        <span
          ref={headingWords}
          className={cn("inline-block scroll-m-20 text-center lg:text-left",
            "text-[32px] sm:text-[36] md:text-[44px] lg:text-[48px] xl:text-[48px] 2xl:text-[60px]",
            "leading-[1.3] font-audio-wide uppercase opacity-0 text-wrap break-words  max-w-full ",
            className)}
        >
          {text.split(' ').slice(1).join(' ')}
        </span>
      </h1>
    </div>

  )
}


