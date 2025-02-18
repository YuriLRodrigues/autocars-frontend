'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { motion, useAnimation, type Variants } from 'framer-motion'

type AnimationDirection = 'up' | 'down' | 'left' | 'right'
type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate'

interface AnimatedWrapperProps {
  children: React.ReactNode
  type?: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
  custom?: Variants
  threshold?: number
}

const createVariants = (type: AnimationType, direction: AnimationDirection): Variants => {
  const variants: Variants = {
    hidden: {},
    visible: {},
  }

  switch (type) {
    case 'fade':
      variants.hidden = { opacity: 0 }
      variants.visible = { opacity: 1 }
      break
    case 'slide':
      switch (direction) {
        case 'up':
          variants.hidden = { y: 50, opacity: 0 }
          variants.visible = { y: 0, opacity: 1 }
          break
        case 'down':
          variants.hidden = { y: -50, opacity: 0 }
          variants.visible = { y: 0, opacity: 1 }
          break
        case 'left':
          variants.hidden = { x: 50, opacity: 0 }
          variants.visible = { x: 0, opacity: 1 }
          break
        case 'right':
          variants.hidden = { x: -50, opacity: 0 }
          variants.visible = { x: 0, opacity: 1 }
          break
      }
      break
    case 'scale':
      variants.hidden = { scale: 0, opacity: 0 }
      variants.visible = { scale: 1, opacity: 1 }
      break
    case 'rotate':
      variants.hidden = { rotate: 180, opacity: 0 }
      variants.visible = { rotate: 0, opacity: 1 }
      break
  }

  return variants
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  type = 'fade',
  direction = 'up',
  duration = 0.8,
  delay = 0,
  custom,
  threshold = 0.3,
}) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true)
        } else {
          setHasBeenVisible(false)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  useEffect(() => {
    if (hasBeenVisible) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [hasBeenVisible, controls])

  const variants = custom || createVariants(type, direction)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay }}
      className="mx-auto min-h-full min-w-full"
    >
      {children}
    </motion.div>
  )
}
