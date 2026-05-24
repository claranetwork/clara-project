"use client"

import { useState, useEffect } from 'react'

interface CustomCursorProps {
  isVisible: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isVisible }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const updatePosition = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      setPosition({ x: lastX, y: lastY })
    }

    const handleScroll = () => {
      setPosition({ x: lastX, y: lastY })
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [])

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
    >
      <div
        className="absolute aspect-square p-3 rounded-full bg-gradient-to-r bg-foreground/30 transition-transform duration-100 ease-out border border-foreground/60 backdrop-blur-md"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p className='font-audio-wide text-[13px] mt-1 font-bold'>Mint</p>
      </div>
    </div>
  )
}
