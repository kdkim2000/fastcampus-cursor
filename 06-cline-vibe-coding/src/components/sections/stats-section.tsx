'use client'

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Award, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Counter } from "@/components/ui/counter"
import type { Counter as CounterType } from "@/types/index"

export interface StatsSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  description?: string
  stats?: CounterType[]
  backgroundColor?: string
  variant?: 'default' | 'compact' | 'featured'
}

// 기본 통계 데이터
const defaultStats: CounterType[] = [
  {
    id: "projects-completed",
    label: "프로젝트 완료",
    value: 500,
    suffix: "+",
    description: "성공적으로 완료한 프로젝트 수"
  },
  {
    id: "happy-clients",
    label: "만족 고객",
    value: 98,
    suffix: "%",
    description: "고객 만족도 평균"
  },
  {
    id: "expert-team",
    label: "전문가 팀",
    value: 50,
    suffix: "+",
    description: "경험이 풍부한 전문가들"
  },
  {
    id: "support-coverage",
    label: "기술 지원",
    value: 24,
    suffix: "/7",
    description: "연중무휴 24시간 지원"
  }
]

// 아이콘 매핑 (시각적 다양성 추가)
const iconMap = {
  "projects-completed": TrendingUp,
  "happy-clients": Users,
  "expert-team": Award,
  "support-coverage": Clock
}

const StatsSection = React.forwardRef<HTMLElement, StatsSectionProps>(
  ({
    className,
    title = "신뢰할 수 있는 결과",
    subtitle = "성과와 실적",
    description = "지난 몇 년간의 꾸준한 노력과 탁월한 결과들로 쌓아온 신뢰와 성공 스토리를 확인하세요.",
    stats = defaultStats,
    backgroundColor = "bg-blue-600",
    variant = 'default',
    ...props
  }, ref) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.2,
        },
      },
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      },
    }

    return (
      <section
        ref={ref}
        className={cn(
          "relative py-20 overflow-hidden",
          variant === 'featured' ? `${backgroundColor} text-white` : "bg-white",
          className
        )}
        {...props}
      >
        {/* 배경 패턴 (featured variant) */}
        {variant === 'featured' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/20 rounded-full" />
          </div>
        )}

        <div className="relative container mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {subtitle && (
                <span className={cn(
                  "inline-block px-4 py-2 rounded-full text-sm font-medium mb-4",
                  variant === 'featured'
                    ? "bg-white/20 text-white backdrop-blur-sm"
                    : "bg-blue-100 text-blue-800"
                )}>
                  {subtitle}
                </span>
              )}

              {title && (
                <h2 className={cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
                  variant === 'featured' ? "text-white" : "text-gray-900"
                )}>
                  {title}
                </h2>
              )}

              {description && (
                <p className={cn(
                  "text-lg leading-relaxed",
                  variant === 'featured' ? "text-blue-100" : "text-gray-600"
                )}>
                  {description}
                </p>
              )}
            </motion.div>
          </div>

          {/* 통계 그리드 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "grid gap-8 md:gap-12",
              variant === 'compact'
                ? "grid-cols-2 lg:grid-cols-4"
                : variant === 'featured'
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-2 lg:grid-cols-4"
            )}
          >
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.id as keyof typeof iconMap]

              return (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  className={cn(
                    "text-center group",
                    variant === 'featured' && "relative"
                  )}
                >
                  {/* 배경 원 (featured variant) */}
                  {variant === 'featured' && (
                    <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors duration-300" />
                  )}

                  {/* 아이콘 */}
                  <div className={cn(
                    "flex justify-center mb-6",
                    variant === 'featured' ? "relative z-10" : ""
                  )}>
                    {IconComponent && (
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center",
                        variant === 'featured'
                          ? "bg-white/20 text-white group-hover:bg-white/30"
                          : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                      )}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                    )}
                  </div>

                  {/* 카운터 숫자 */}
                  <div className={cn(
                    "mb-4 relative z-10",
                    variant === 'featured' ? "" : ""
                  )}>
                    <Counter
                      value={stat.value}
                      label="" // 별도 표시
                      suffix={stat.suffix}
                      variant={variant === 'featured' ? 'large' : 'default'}
                      className={cn(
                        variant === 'featured' ? "text-white" : "text-gray-900"
                      )}
                    />
                  </div>

                  {/* 라벨과 설명 */}
                  <div className={cn(
                    "relative z-10",
                    variant === 'featured' ? "" : ""
                  )}>
                    <h3 className={cn(
                      "font-bold text-lg mb-2",
                      variant === 'featured' ? "text-white" : "text-gray-900"
                    )}>
                      {stat.label}
                    </h3>
                    {stat.description && (
                      <p className={cn(
                        "text-sm",
                        variant === 'featured' ? "text-blue-100" : "text-gray-600"
                      )}>
                        {stat.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* 추가 설명 (선택적) */}
          {variant === 'featured' && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                이 수치들은 단순한 숫자가 아닌, 고객님과의 신뢰 관계와 성공적인 파트너십의 증거입니다.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    )
  }
)

StatsSection.displayName = "StatsSection"

export { StatsSection }
