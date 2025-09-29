'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Code2,
  Smartphone,
  Cloud,
  Shield,
  Database,
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Service } from "@/types/index"

export interface ServicesSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  description?: string
  services?: Service[]
  showViewAllButton?: boolean
  viewAllButtonText?: string
  viewAllButtonHref?: string
  variant?: 'default' | 'compact' | 'featured'
}

// 기본 서비스 데이터
const defaultServices: Service[] = [
  {
    id: "digital-transformation",
    title: "디지털 트랜스포메이션",
    description: "전통적인 비즈니스 모델을 혁신적인 디지털 솔루션으로 전환하여 경쟁력을 강화합니다.",
    icon: "Code2",
    slug: "digital-transformation",
    targetAudience: "전통 산업 기업 및 중소기업",
    features: [
      "비즈니스 프로세스 최적화",
      "디지털 전략 수립",
      "기술 아키텍처 설계",
      "변화 관리 컨설팅"
    ]
  },
  {
    id: "cloud-solutions",
    title: "클라우드 솔루션",
    description: "확장성 있고 비용 효율적인 클라우드 인프라를 구축하여 비즈니스 연속성을 보장합니다.",
    icon: "Cloud",
    slug: "cloud-solutions",
    targetAudience: "스타트업 및 성장 기업",
    features: [
      "클라우드 마이그레이션",
      "하이브리드 클라우드 구축",
      "DevOps 자동화",
      "모니터링 및 관리"
    ]
  },
  {
    id: "mobile-development",
    title: "모바일 애플리케이션",
    description: "크로스 플랫폼 모바일 앱 개발로 고객과의 연결을 강화하고 사용자 경험을 향상시킵니다.",
    icon: "Smartphone",
    slug: "mobile-development",
    targetAudience: "소비자 대상 비즈니스",
    features: [
      "네이티브 앱 개발",
      "크로스 플랫폼 개발",
      "UI/UX 디자인",
      "앱 스토어 배포"
    ]
  },
  {
    id: "cybersecurity",
    title: "사이버 보안",
    description: "첨단 보안 솔루션으로 디지털 자산을 보호하고 사이버 위협으로부터 안전하게 지킵니다.",
    icon: "Shield",
    slug: "cybersecurity",
    targetAudience: "금융 및 의료 기관",
    features: [
      "보안 감사 및 평가",
      "침입 탐지 시스템",
      "데이터 암호화",
      "보안 교육 및 훈련"
    ]
  },
  {
    id: "data-analytics",
    title: "데이터 분석",
    description: "빅데이터 분석을 통해 의미 있는 인사이트를 도출하고 데이터 기반 의사결정을 지원합니다.",
    icon: "Database",
    slug: "data-analytics",
    targetAudience: "데이터 중심 기업",
    features: [
      "데이터 웨어하우스 구축",
      "비즈니스 인텔리전스",
      "예측 분석",
      "실시간 대시보드"
    ]
  },
  {
    id: "consulting",
    title: "IT 컨설팅",
    description: "IT 전략 수립부터 실행까지 종합적인 컨설팅 서비스로 비즈니스 목표 달성을 지원합니다.",
    icon: "Users",
    slug: "consulting",
    targetAudience: "모든 규모의 기업",
    features: [
      "IT 전략 수립",
      "기술 아키텍처 설계",
      "프로젝트 관리",
      "기술 파트너십"
    ]
  }
]

// 아이콘 매핑
const iconMap = {
  Code2,
  Smartphone,
  Cloud,
  Shield,
  Database,
  Users
}

const ServicesSection = React.forwardRef<HTMLElement, ServicesSectionProps>(
  ({
    className,
    title = "제공하는 서비스",
    subtitle = "전문적인 솔루션",
    description = "최첨단 기술과 풍부한 경험을 바탕으로 귀사의 비즈니스 목표 달성을 위한 맞춤형 솔루션을 제공합니다.",
    services = defaultServices,
    showViewAllButton = true,
    viewAllButtonText = "모든 서비스 보기",
    viewAllButtonHref = "/services",
    variant = 'default',
    ...props
  }, ref) => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.1,
        },
      },
    }

    const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      },
    }

    return (
      <section
        ref={ref}
        className={cn(
          "py-20 bg-gray-50",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {subtitle && (
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  {subtitle}
                </span>
              )}

              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {title}
                </h2>
              )}

              {description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {description}
                </p>
              )}
            </motion.div>
          </div>

          {/* 서비스 카드 그리드 */}
          <motion.div
            className={cn(
              "grid gap-8",
              variant === 'featured'
                ? "grid-cols-1 lg:grid-cols-3"
                : variant === 'compact'
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code2

              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden">
                    <CardContent className="p-8">
                      {/* 아이콘 */}
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>

                      {/* 제목과 설명 */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* 주요 기능들 */}
                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2 mb-8">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* 더보기 링크 */}
                      <Link href={`/services/${service.slug}`}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto group-hover:bg-blue-50 transition-colors"
                        >
                          <span>자세히 보기</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* 모든 서비스 보기 버튼 */}
          {showViewAllButton && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href={viewAllButtonHref}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  {viewAllButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    )
  }
)

ServicesSection.displayName = "ServicesSection"

export { ServicesSection }
