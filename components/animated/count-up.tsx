"use client"
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CountComponent = ({ number }: { number: number }) => {
  const numberRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(numberRef.current, {
        textContent: number,
        duration: 3,
        ease: "power4.out",
        snap: {
          textContent: 1
        },
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top bottom",
          end: "bottom center",
          toggleActions: "play none none none"
        }
      });
    }, numberRef)

    return () => ctx.revert()
  }, [number])

  return (
    <span ref={numberRef}>
      0
    </span>
  )
}

export default CountComponent


