'use client'

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { NavItem } from "@/types/index"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  navigation?: NavItem[]
  ctaButton?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary' | 'outline'
  }
}

// 기본 네비게이션 메뉴
const defaultNavigation: NavItem[] = [
  {
    label: "회사 소개",
    href: "/about"
  },
  {
    label: "서비스",
    href: "/services",
    children: [
      { label: "서비스 목록", href: "/services" },
      { label: "상세 보기", href: "/services/digital-transformation" }
    ]
  },
  {
    label: "블로그",
    href: "/blog"
  },
  {
    label: "문의하기",
    href: "/contact"
  }
]

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({
    className,
    logo,
    navigation = defaultNavigation,
    ctaButton = {
      label: "문의하기",
      href: "/contact",
      variant: "primary"
    },
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null)

    const toggleMenu = () => setIsOpen(!isOpen)

    const handleSubmenuToggle = (itemLabel: string) => {
      setOpenSubmenu(openSubmenu === itemLabel ? null : itemLabel)
    }

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* 로고 */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                {logo || (
                  <>
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">Company</span>
                  </>
                )}
              </Link>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <div className="relative">
                      <button
                        className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => handleSubmenuToggle(item.label)}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {/* 드롭다운 메뉴 */}
                      {openSubmenu === item.label && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setOpenSubmenu(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA 버튼 */}
            <div className="hidden md:flex">
              <Link href={ctaButton.href}>
                <Button
                  variant={ctaButton.variant === 'primary' ? 'primary' : 'outline'}
                  size="sm"
                >
                  {ctaButton.label}
                </Button>
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleMenu}
              aria-label="메뉴 열기"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <nav className="px-4 py-2 space-y-1">
                {navigation.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          className="flex items-center w-full px-3 py-2 text-left text-gray-600 hover:text-gray-900 transition-colors"
                          onClick={() => handleSubmenuToggle(item.label)}
                        >
                          {item.label}
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </button>

                        {openSubmenu === item.label && (
                          <div className="ml-4 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={() => {
                                  setIsOpen(false)
                                  setOpenSubmenu(null)
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* 모바일 CTA 버튼 */}
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Link href={ctaButton.href} onClick={() => setIsOpen(false)} className="block">
                    <Button
                      variant={ctaButton.variant === 'primary' ? 'primary' : 'outline'}
                      size="md"
                      className="w-full"
                    >
                      {ctaButton.label}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    )
  }
)

Header.displayName = "Header"

export { Header }
