'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeInProps {
  children: React.ReactNode
  direction?: Direction
  distance?: number
  duration?: number
  delay?: number
  className?: string
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'none',
  distance = 30,
  duration = 0.7,
  delay = 0,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current

    if (element) {
      const getInitialPosition = () => {
        switch (direction) {
          case 'up': return { y: distance, opacity: 0 }
          case 'down': return { y: -distance, opacity: 0 }
          case 'left': return { x: distance, opacity: 0 }
          case 'right': return { x: -distance, opacity: 0 }
          default: return { opacity: 0 }
        }
      }

      gsap.set(element, getInitialPosition())

      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: duration,
            delay: delay,
            ease: 'power4.out',
          })
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [direction, distance, duration, delay])

  return (
    <div ref={elementRef} className={"opacity-0 " + className}>
      {children}
    </div>
  )
}


