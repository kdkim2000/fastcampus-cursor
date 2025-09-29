import * as React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  companyInfo?: {
    name: string
    description?: string
    address?: string
    phone?: string
    email?: string
  }
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  quickLinks?: {
    title: string
    links: Array<{
      label: string
      href: string
    }>
  }[]
  newsletter?: boolean
  copyright?: string
}

// 기본 Footer 데이터
const defaultCompanyInfo = {
  name: "Company",
  description: "현대적인 비즈니스 솔루션을 제공하는 기업입니다.",
  address: "서울특별시 강남구 테헤란로 123",
  phone: "+82-2-123-4567",
  email: "hello@company.com"
}

const defaultSocialLinks = {
  facebook: "https://facebook.com/company",
  twitter: "https://twitter.com/company",
  instagram: "https://instagram.com/company",
  linkedin: "https://linkedin.com/company/company"
}

const defaultQuickLinks = [
  {
    title: "회사",
    links: [
      { label: "회사 소개", href: "/about" },
      { label: "팀 소개", href: "/about/team" },
      { label: "연혁", href: "/about/history" },
      { label: "채용", href: "/careers" }
    ]
  },
  {
    title: "서비스",
    links: [
      { label: "서비스 목록", href: "/services" },
      { label: "디지털 트랜스포메이션", href: "/services/digital-transformation" },
      { label: "컨설팅", href: "/services/consulting" },
      { label: "기술 지원", href: "/services/support" }
    ]
  },
  {
    title: "지원",
    links: [
      { label: "블로그", href: "/blog" },
      { label: "문의하기", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "이용약관", href: "/terms" }
    ]
  }
]

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({
    className,
    logo,
    companyInfo = defaultCompanyInfo,
    socialLinks = defaultSocialLinks,
    quickLinks = defaultQuickLinks,
    newsletter = true,
    copyright = `© ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.`,
    ...props
  }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn("bg-gray-900 text-white", className)}
        {...props}
      >
        {/* 메인 Footer 섹션 */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* 회사 정보 */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                {logo || (
                  <>
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <span className="text-xl font-bold">{companyInfo.name}</span>
                  </>
                )}
              </div>

              {companyInfo.description && (
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {companyInfo.description}
                </p>
              )}

              {/* 연락처 정보 */}
              <div className="space-y-3">
                {companyInfo.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{companyInfo.address}</span>
                  </div>
                )}
                {companyInfo.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{companyInfo.phone}</span>
                  </div>
                )}
                {companyInfo.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{companyInfo.email}</span>
                  </div>
                )}
              </div>

              {/* 소셜 링크 */}
              {socialLinks && (
                <div className="flex space-x-4 mt-6">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* 퀵 링크들 */}
            {quickLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 뉴스레터 구독 (선택적) */}
            {newsletter && (
              <div className="lg:col-span-2 lg:mt-0 mt-8 lg:col-start-4">
                <h3 className="font-semibold mb-4">뉴스레터 구독</h3>
                <p className="text-gray-300 text-sm mb-4">
                  최신 소식과 업데이트를 받아보세요.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    구독하기
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* 하단 저작권 바 */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                {copyright}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  개인정보 처리방침
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  이용약관
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
)

Footer.displayName = "Footer"

export { Footer }
