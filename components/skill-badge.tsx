"use client"

import { useEffect, useRef, useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number // 0-100
}

const SkillBadge = ({ name, level }: SkillBadgeProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (badgeRef.current) {
      observer.observe(badgeRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div
      ref={badgeRef}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center"
    >
      <span className="text-white mr-3">{name}</span>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden w-24">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isAnimated ? `${level}%` : "0%",
          }}
        ></div>
      </div>
    </div>
  )
}

export default SkillBadge
