'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string
  content: React.ReactNode
  logo?: string
  name?: string
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  variant?: 'default' | 'logos'
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    className,
    items,
    autoPlay = true,
    interval = 3000,
    showDots = true,
    showArrows = false,
    variant = 'default',
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isHovered, setIsHovered] = React.useState(false)

    // 자동 슬라이드
    React.useEffect(() => {
      if (!autoPlay || isHovered || items.length <= 1) return

      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
      }, interval)

      return () => clearInterval(timer)
    }, [autoPlay, interval, isHovered, items.length])

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    const goToPrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? items.length - 1 : prevIndex - 1
      )
    }

    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }

    if (items.length === 0) return null

    const slideVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }),
    }

    const variants = {
      default: {
        container: "relative w-full h-64 overflow-hidden rounded-lg",
        slideContainer: "absolute inset-0",
        slide: "absolute inset-0 flex items-center justify-center",
        dots: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2",
        dot: "w-2 h-2 rounded-full bg-white/50 transition-colors cursor-pointer hover:bg-white",
        dotActive: "bg-white",
        arrows: "absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4",
        arrow: "w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
      },
      logos: {
        container: "relative w-full overflow-hidden",
        slideContainer: "flex transition-transform duration-500 ease-in-out",
        slide: "flex-shrink-0 w-full flex items-center justify-center space-x-8",
        dots: "hidden",
        dot: "",
        dotActive: "",
        arrows: "hidden",
        arrow: ""
      }
    }

    const currentVariant = variants[variant]

    return (
      <div
        ref={ref}
        className={cn(currentVariant.container, className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {variant === 'logos' ? (
          // 로고 전용 캐러셜
          <div className={currentVariant.slideContainer}>
            <motion.div
              className={currentVariant.slide}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {items.map((item) => (
                <div key={item.id} className="mx-8 grayscale hover:grayscale-0 transition-all duration-300">
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={item.name || 'Partner logo'}
                      className="h-12 w-auto object-contain"
                    />
                  )}
                  {item.content}
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          // 일반 캐러셜
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={currentVariant.slide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {items[currentIndex]?.content}
            </motion.div>
          </AnimatePresence>
        )}

        {/* 도트 네비게이션 */}
        {showDots && variant !== 'logos' && items.length > 1 && (
          <div className={currentVariant.dots}>
            {items.map((_, index) => (
              <button
                key={index}
                className={cn(
                  currentVariant.dot,
                  index === currentIndex && currentVariant.dotActive
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}

        {/* 화살표 네비게이션 */}
        {showArrows && variant !== 'logos' && items.length > 1 && (
          <div className={currentVariant.arrows}>
            <button
              className={currentVariant.arrow}
              onClick={goToPrev}
            >
              ‹
            </button>
            <button
              className={currentVariant.arrow}
              onClick={goToNext}
            >
              ›
            </button>
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

export { Carousel }
