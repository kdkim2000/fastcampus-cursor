'use client'

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { BlogPost } from "@/types/index"

export interface BlogSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  description?: string
  posts?: BlogPost[]
  showViewAllButton?: boolean
  viewAllButtonText?: string
  viewAllButtonHref?: string
  maxPosts?: number
  variant?: 'default' | 'compact' | 'featured'
}

// 기본 블로그 포스트 데이터
const defaultPosts: BlogPost[] = [
  {
    id: "digital-transformation-strategy-2024",
    title: "2024년 디지털 트랜스포메이션 전략 가이드",
    excerpt: "디지털 전환의 핵심 원칙과 성공적인 구현 사례들을 살펴보고, 귀사의 경쟁력 강화를 위한 전략적 접근 방법을 알아보세요.",
    content: "풀 콘텐츠...",
    thumbnail: "/blog/digital-transformation.jpg",
    tags: ["디지털 트랜스포메이션", "비즈니스 전략", "기술 혁신"],
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-09-01"),
    author: {
      name: "김기술",
      avatar: "/avatars/kim-tech.jpg",
      bio: "디지털 트랜스포메이션 전문 컨설턴트"
    }
  },
  {
    id: "cloud-migration-best-practices",
    title: "클라우드 마이그레이션 모범 사례",
    excerpt: "효율적인 클라우드 이전을 위한 단계별 가이드와 실제 성공 사례를 통해 리스크를 최소화하고 ROI를 극대화하는 방법을 배워보세요.",
    content: "풀 콘텐츠...",
    thumbnail: "/blog/cloud-migration.jpg",
    tags: ["클라우드", "마이그레이션", "DevOps"],
    createdAt: new Date("2024-08-25"),
    updatedAt: new Date("2024-08-25"),
    author: {
      name: "이클라우드",
      avatar: "/avatars/lee-cloud.jpg",
      bio: "클라우드 아키텍트"
    }
  },
  {
    id: "cybersecurity-modern-approach",
    title: "현대적 사이버 보안 접근 방식",
    excerpt: "제로 트러스트 모델과 AI 기반 보안 시스템을 활용한 현대적인 사이버 보안 전략을 소개합니다.",
    content: "풀 콘텐츠...",
    thumbnail: "/blog/cybersecurity.jpg",
    tags: ["사이버 보안", "제로 트러스트", "AI 보안"],
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-08-15"),
    author: {
      name: "박보안",
      avatar: "/avatars/park-security.jpg",
      bio: "보안 전문가"
    }
  }
]

// 읽기 시간 계산 유틸리티
const calculateReadTime = (content: string): number => {
  // 대략적인 단어 수 기반 계산 (영어 기준)
  // 한국어는 영어보다 약 20-30% 더 오래 걸림
  const words = content.split(' ').length;
  const readTimeMinutes = Math.ceil(words / 200 * 1.25); // 한국어 보정
  return Math.max(readTimeMinutes, 1); // 최소 1분
}

// 날짜 포맷팅 유틸리티
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const BlogSection = React.forwardRef<HTMLElement, BlogSectionProps>(
  ({
    className,
    title = "최신 블로그",
    subtitle = "인사이트와 트렌드",
    description = "기술 트렌드, 비즈니스 인사이트, 그리고 성공 사례들을 공유합니다. 최신 정보를 통해 귀사의 의사결정에 도움이 되도록 노력하겠습니다.",
    posts = defaultPosts,
    showViewAllButton = true,
    viewAllButtonText = "모든 포스트 보기",
    viewAllButtonHref = "/blog",
    maxPosts = 3,
    variant = 'default',
    ...props
  }, ref) => {
    const displayPosts = posts.slice(0, maxPosts)

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
                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
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

          {/* 블로그 포스트 그리드 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "grid gap-8 mb-12",
              variant === 'compact'
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {displayPosts.map((post, index) => {
              const readTime = calculateReadTime(post.content || post.excerpt)

              return (
                <motion.div key={post.id} variants={cardVariants}>
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden">
                    {/* 썸네일 이미지 */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        {/* 실제 프로젝트에서는 실제 이미지를 사용 */}
                        <div className="text-gray-400 text-sm">블로그 이미지</div>
                      </div>
                      {/* 오버레이 그라데이션 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardContent className="p-6">
                      {/* 태그들 */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* 제목 */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      {/* 발췌문 */}
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* 메타 정보 */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        {/* 작성자 */}
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author.name}</span>
                        </div>

                        {/* 날짜 */}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>

                        {/* 읽기 시간 */}
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{readTime}분</span>
                        </div>
                      </div>

                      {/* 읽기 링크 */}
                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto"
                        >
                          <span>읽기</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* 모든 포스트 보기 버튼 */}
          {showViewAllButton && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href={viewAllButtonHref}>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
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

BlogSection.displayName = "BlogSection"

export { BlogSection }
