'use client'

import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Circle } from 'lucide-react'

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'border-2 border-white/[0.15] backdrop-blur-[2px]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]',
          )}
        />
      </motion.div>
    </motion.div>
  )
}

function HeroGeometric({
  badge = 'Design Collective',
  title1 = 'Elevate Your Digital Vision',
  title2 = 'Crafting Exceptional Websites',
  description = 'Description of the hero',
}: {
  badge?: string
  title1?: string
  title2?: string
  description?: string
}) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className={cn('relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background')}>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl',
        )}
      />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%] md:left-[-5%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%] md:right-[0%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] top-[10%] md:right-[20%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] top-[5%] md:left-[25%] md:top-[10%]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              'mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 md:mb-12',
              isDarkMode
                ? 'border-white/[0.08] bg-white/[0.03] text-white/60'
                : 'border-black/[0.08] bg-black/[0.03] text-black/60',
            )}
          >
            <Circle className={cn('h-2 w-2 rounded-full bg-primary')} />
            <span className="text-sm tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span
                className={cn(
                  'bg-gradient-to-b bg-clip-text text-transparent',
                  isDarkMode ? 'from-white to-white/80' : 'from-gray-900 to-gray-700',
                )}
              >
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  'bg-gradient-to-r bg-clip-text text-transparent',
                  isDarkMode ? 'from-indigo-300 via-white/90 to-rose-300' : 'from-indigo-600 via-gray-800 to-rose-600',
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p
              className={cn(
                'mx-auto mb-8 max-w-xl px-4 text-base font-light leading-relaxed tracking-wide sm:text-lg md:text-xl',
                isDarkMode ? 'text-white/40' : 'text-black/60',
              )}
            >
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent',
          isDarkMode ? 'to-[#030303]/80' : 'to-gray-100/80',
        )}
      />
    </div>
  )
}

export { HeroGeometric }
