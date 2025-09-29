'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { animateCounter, formatCounterValue } from "@/lib/utils/counter"

export interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  label: string
  suffix?: string
  description?: string
  duration?: number
  variant?: 'default' | 'large' | 'compact'
}

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
  ({
    className,
    value,
    label,
    suffix = '',
    description,
    duration = 2000,
    variant = 'default',
    ...props
  }, ref) => {
    const counterRef = React.useRef<HTMLSpanElement>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    const [displayValue, setDisplayValue] = React.useState('0')

    // Intersection Observer로 애니메이션 트리거
    React.useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true)

              if (counterRef.current) {
                // 아직 애니메이션이 실행되지 않은 경우에만 실행
                const currentText = counterRef.current.textContent
                if (currentText === '0' || currentText === '0' + suffix) {
                  animateCounter(counterRef.current, value, duration, suffix)
                }
              }
            }
          })
        },
        { threshold: 0.3 }
      )

      if (counterRef.current) {
        observer.observe(counterRef.current)
      }

      return () => observer.disconnect()
    }, [value, suffix, duration, isVisible])

    const variants = {
      default: {
        container: "text-center",
        value: "text-3xl font-bold text-gray-900",
        label: "text-lg font-semibold text-gray-800 mt-2",
        description: "text-sm text-gray-600 mt-1"
      },
      large: {
        container: "text-center",
        value: "text-5xl font-bold text-gray-900",
        label: "text-xl font-semibold text-gray-800 mt-3",
        description: "text-base text-gray-600 mt-2"
      },
      compact: {
        container: "text-left",
        value: "text-2xl font-bold text-gray-900",
        label: "text-base font-semibold text-gray-800 mt-1",
        description: "text-xs text-gray-600 mt-1"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(variants[variant].container, className)}
        {...props}
      >
        <div className={variants[variant].value}>
          <span
            ref={counterRef}
            data-target={value}
            data-suffix={suffix}
          >
            0{suffix}
          </span>
        </div>

        <div className={variants[variant].label}>
          {label}
        </div>

        {description && (
          <div className={variants[variant].description}>
            {description}
          </div>
        )}
      </div>
    )
  }
)

Counter.displayName = "Counter"

export { Counter }
