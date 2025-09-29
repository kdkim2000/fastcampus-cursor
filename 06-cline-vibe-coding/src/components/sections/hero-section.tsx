'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Play, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: {
    label: string
    href: string
    icon?: boolean
  }
  secondaryButton?: {
    label: string
    href: string
    icon?: boolean
  }
  videoButton?: {
    label: string
    videoUrl?: string
  }
  backgroundImage?: string
  backgroundVideo?: string
  backgroundOverlay?: boolean
  stats?: Array<{
    value: string
    label: string
  }>
  showScrollIndicator?: boolean
}

// 기본 Hero 데이터
const defaultProps: Partial<HeroSectionProps> = {
  title: "미래를 이끌다,\n디지털 혁신의 선두주자",
  subtitle: "현대 비즈니스 솔루션",
  description: "최신 기술과 전문적인 컨설팅으로 귀사의 디지털 트랜스포메이션을 지원합니다. 데이터 기반의 전략적 의사결정과 혁신적인 솔루션으로 비즈니스 가치를 극대화합니다.",
  primaryButton: {
    label: "서비스 보기",
    href: "/services",
    icon: true
  },
  secondaryButton: {
    label: "문의하기",
    href: "/contact",
    icon: false
  },
  videoButton: {
    label: "회사 소개 영상",
    videoUrl: "#"
  },
  backgroundImage: "/hero-background.jpg",
  backgroundOverlay: true,
  stats: [
    { value: "500+", label: "프로젝트 완료" },
    { value: "98%", label: "고객 만족도" },
    { value: "50+", label: "전문가 팀" },
    { value: "24/7", label: "기술 지원" }
  ],
  showScrollIndicator: true
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({
    className,
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    description = defaultProps.description,
    primaryButton = defaultProps.primaryButton,
    secondaryButton = defaultProps.secondaryButton,
    videoButton = defaultProps.videoButton,
    backgroundImage = defaultProps.backgroundImage,
    backgroundVideo,
    backgroundOverlay = defaultProps.backgroundOverlay,
    stats = defaultProps.stats,
    showScrollIndicator = defaultProps.showScrollIndicator,
    ...props
  }, ref) => {
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

    const handleVideoPlay = () => {
      setIsVideoPlaying(true)
    }

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
      visible: { opacity: 1, y: 0 },
    }

    const titleVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }

    return (
      <section
        ref={ref}
        className={cn(
          "relative min-h-screen flex items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* 배경 */}
        {backgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500" />
        )}

        {/* 오버레이 */}
        {backgroundOverlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}

        {/* 콘텐츠 */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 서브타이틀 */}
            {subtitle && (
              <motion.div
                variants={itemVariants}
                className="mb-4"
              >
                <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-100 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30">
                  {subtitle}
                </span>
              </motion.div>
            )}

            {/* 메인 타이틀 */}
            {title && (
              <motion.h1
                variants={titleVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {title.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </motion.h1>
            )}

            {/* 설명 */}
            {description && (
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {/* 버튼들 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              {primaryButton && (
                <Link href={primaryButton.href}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {primaryButton.label}
                    {primaryButton.icon && (
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </Button>
                </Link>
              )}

              {secondaryButton && (
                <Link href={secondaryButton.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  >
                    {secondaryButton.label}
                  </Button>
                </Link>
              )}

              {videoButton && (
                <button
                  onClick={handleVideoPlay}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                  </div>
                  <span className="text-lg">{videoButton.label}</span>
                </button>
              )}
            </motion.div>

            {/* 통계 */}
            {stats && stats.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2">스크롤하여 더보기</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </motion.div>
        )}

        {/* 비디오 모달 (선택적) */}
        {isVideoPlaying && videoButton?.videoUrl && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <iframe
                src={videoButton.videoUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"

export { HeroSection }
