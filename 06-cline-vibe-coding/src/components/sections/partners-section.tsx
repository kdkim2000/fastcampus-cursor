'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Carousel } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import type { Partner, CarouselItem } from "@/types/index"

export interface PartnersSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  description?: string
  partners?: Partner[]
  showViewAllButton?: boolean
  viewAllButtonText?: string
  viewAllButtonHref?: string
  variant?: 'default' | 'compact' | 'showcase'
  carouselInterval?: number
}

// 기본 파트너 데이터
const defaultPartners: Partner[] = [
  {
    id: "samsung",
    name: "삼성전자",
    logo: "/partners/samsung-logo.svg",
    website: "https://samsung.com"
  },
  {
    id: "lg",
    name: "LG전자",
    logo: "/partners/lg-logo.svg",
    website: "https://lg.com"
  },
  {
    id: "hyundai",
    name: "현대자동차",
    logo: "/partners/hyundai-logo.svg",
    website: "https://hyundai.com"
  },
  {
    id: "sk",
    name: "SK그룹",
    logo: "/partners/sk-logo.svg",
    website: "https://sk.com"
  },
  {
    id: "kt",
    name: "KT",
    logo: "/partners/kt-logo.svg",
    website: "https://kt.com"
  },
  {
    id: "kakao",
    name: "카카오",
    logo: "/partners/kakao-logo.svg",
    website: "https://kakao.com"
  },
  {
    id: "naver",
    name: "네이버",
    logo: "/partners/naver-logo.svg",
    website: "https://naver.com"
  },
  {
    id: "nhn",
    name: "NHN",
    logo: "/partners/nhn-logo.svg",
    website: "https://nhn.com"
  }
]

// Carousel 아이템으로 변환
const partnersToCarouselItems = (partners: Partner[]): CarouselItem[] => {
  return partners.map(partner => ({
    id: partner.id,
    content: (
      <div className="flex items-center justify-center p-4">
        {/* 실제 프로젝트에서는 logo를 사용 */}
        <div className="text-center">
          <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center mx-auto mb-2">
            <span className="text-xs text-gray-600">{partner.name}</span>
          </div>
          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-blue-600 flex items-center justify-center"
          >
            {partner.name}
          </Link>
        </div>
      </div>
    ),
    logo: partner.logo,
    name: partner.name
  }))
}

const PartnersSection = React.forwardRef<HTMLElement, PartnersSectionProps>(
  ({
    className,
    title = "신뢰받는 파트너사",
    subtitle = "함께 성장하는 파트너십",
    description = "글로벌 기업 및 주요 기관들과의 전략적 파트너십을 통해 혁신적인 솔루션을 제공합니다. 함께하는 파트너사와의 협력을 바탕으로 최고의 가치를 창출하겠습니다.",
    partners = defaultPartners,
    showViewAllButton = false,
    viewAllButtonText = "더 많은 파트너 보기",
    viewAllButtonHref = "/partners",
    variant = 'default',
    carouselInterval = 4000,
    ...props
  }, ref) => {
    const carouselItems = partnersToCarouselItems(partners)

    return (
      <section
        ref={ref}
        className={cn(
          "py-20 bg-white",
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
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
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

          {/* 파트너 캐러셜 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={cn(
              "mb-12",
              variant === 'showcase' ? "bg-gray-50 rounded-2xl p-8" : ""
            )}
          >
            <Carousel
              items={carouselItems}
              variant="logos"
              autoPlay={true}
              interval={carouselInterval}
              showDots={variant === 'default'}
              showArrows={false}
              className={cn(
                variant === 'showcase'
                  ? "py-8"
                  : "py-4"
              )}
            />
          </motion.div>

          {/* 추가 메시지 (선택적) */}
          {variant === 'showcase' && (
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                글로벌 리더들과의 파트너십을 통해 혁신을 주도하고 있습니다.
                <br />
                귀사의 성공을 위한 최고의 파트너가 되겠습니다.
              </p>
            </motion.div>
          )}

          {/* 모든 파트너 보기 버튼 */}
          {showViewAllButton && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href={viewAllButtonHref}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
                >
                  {viewAllButtonText}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    )
  }
)

PartnersSection.displayName = "PartnersSection"

export { PartnersSection }
