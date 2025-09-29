'use client'

import * as React from "react"
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ContactFormData, validateContactForm } from "@/lib/utils/form-validation"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Building
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    companyName: '',
    type: 'inquiry',
    message: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData(e.target as HTMLFormElement)
    const validation = validateContactForm(form)

    if (!validation.success) {
      setErrors(validation.errors || {})
      setIsSubmitting(false)
      return
    }

    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setErrors({})
    setFormData({
      name: '',
      email: '',
      companyName: '',
      type: 'inquiry',
      message: ''
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute bottom-20 right-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-40 right-16 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              함께 이야기해봐요
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              귀사의 비전을 실현하기 위한 첫 걸음은 우리와의 대화입니다.
              언제든지 연락 주시면 전문 컨설턴트가 자세한 상담을 드리겠습니다.
            </p>
          </div>
        </section>

        {/* 연락처 정보 및 문의 폼 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* 연락처 정보 */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  연락처 정보
                </h2>

                <div className="space-y-6">
                  {/* 주소 */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">오시는 길</CardTitle>
                          <p className="text-gray-600 leading-relaxed">
                            서울특별시 강남구 테헤란로 123
                            <br />
                            해킹시티빌딩 10층
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 연락처 */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">전화 상담</CardTitle>
                          <p className="text-gray-600 leading-relaxed">
                            +82-2-123-4567
                            <br />
                            평일 9:00 - 18:00 (KST)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 이메일 */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Mail className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">이메일 문의</CardTitle>
                          <p className="text-gray-600 leading-relaxed">
                            hello@company.com
                            <br />
                            24시간 이내 답변 드립니다
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 상담 시간 */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">상담 시간</CardTitle>
                          <div className="text-gray-600 leading-relaxed space-y-1">
                            <p>평일: 오전 9:00 - 오후 6:00</p>
                            <p>점심시간: 오후 12:00 - 오후 1:00</p>
                            <p>주말 및 공휴일: 휴무</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 추가 정보 */}
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 상담을 위해</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      기업 규모와 현재 상황 간단히 말씀해 주세요
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      관심 있는 서비스나 솔루션이 있으시면 알려주세요
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      상담 희망 일정과 방법을 선택해 주세요
                    </li>
                  </ul>
                </div>
              </div>

              {/* 문의 폼 */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  문의하기
                </h2>

                {isSubmitted ? (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        문의가 접수되었습니다!
                      </h3>
                      <p className="text-gray-600 mb-6">
                        빠른 시간 내에 전문 컨설턴트가 연락드리겠습니다.
                        <br />
                        평균 응답 시간: 24시간 이내
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="w-full"
                      >
                        새로운 문의하기
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 이름 */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            이름 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                              errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="귀하의 성함을 입력해주세요"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* 이메일 */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            이메일 <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                              errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="biz@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* 회사명 */}
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                            회사명
                          </label>
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                              errors.companyName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="회사명을 입력해주세요 (선택사항)"
                          />
                          {errors.companyName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.companyName}
                            </p>
                          )}
                        </div>

                        {/* 문의 유형 */}
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                            문의 유형 <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                          >
                            <option value="inquiry">일반 문의</option>
                            <option value="partnership">파트너십 문의</option>
                            <option value="support">기술 지원</option>
                            <option value="other">기타</option>
                          </select>
                        </div>

                        {/* 메시지 */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            메시지 <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${
                              errors.message ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="문의하실 내용이나 프로젝트에 대해 자세히 알려주세요."
                          />
                          {errors.message && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* 제출 버튼 */}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg font-semibold transition-colors duration-300 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                              전송 중...
                            </>
                          ) : (
                            <>
                              문의 보내기
                              <Send className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>

                        {/* 개인정보 처리 안내 */}
                        <div className="text-xs text-gray-500 mt-4 p-4 bg-gray-50 rounded-lg">
                          <Building className="inline w-4 h-4 mr-1" />
                          <strong>개인정보 처리 안내:</strong> 귀하의 개인정보는 문의 응대 목적으로만 사용되며,
                          <a href="/privacy" className="underline hover:text-gray-700"> 개인정보처리방침</a>에 따라 안전하게 보호됩니다.
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
