import { notFound } from 'next/navigation'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { services } from "@/lib/data/services"
import {
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Award
} from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: '서비스를 찾을 수 없습니다',
    }
  }

  return {
    title: `${service.title} - Company`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  // 관련 서비스 추천 (현재 서비스 제외)
  const relatedServices = services
    .filter(s => s.id !== service.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-40 right-16 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-600/20 text-blue-100 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30">
                  {service.title}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Target Audience Badge */}
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg backdrop-blur-sm">
                  <Users className="h-4 w-4 mr-2" />
                  주요 대상: {service.targetAudience}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  >
                    상담 신청하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                  >
                    모든 서비스 보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  {service.content && (
                    <div dangerouslySetInnerHTML={{ __html: service.content.replace(/\n/g, '<br />') }} />
                  )}

                  <div className="bg-blue-50 p-6 rounded-lg mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">이 서비스의 장점</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">최신 기술을 활용한 혁신적인 접근 방식</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">숙련된 전문가 팀의 체계적 프로젝트 관리</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">지속적인 모니터링과 품질 관리</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">귀사의 비즈니스 목표 달성을 위한 맞춤형 솔루션</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Service Features */}
                <Card>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-4">주요 기능</CardTitle>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-4 text-white">빠른 상담</CardTitle>
                    <p className="text-blue-100 mb-4 leading-relaxed">
                      이 서비스에 대해 더 궁금한 점이 있으시면 언제든지 연락주세요.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-200" />
                        <span>24시간 이내 답변</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-blue-200" />
                        <span>전문 컨설턴트 배정</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-blue-200" />
                        <span>무료 초기 상담</span>
                      </div>
                    </div>
                    <Link href="/contact" className="block mt-6">
                      <Button
                        size="sm"
                        className="w-full bg-white text-blue-600 hover:bg-blue-50"
                      >
                        상담 신청하기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Service Stats */}
                <Card>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-4">서비스 통계</CardTitle>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">프로젝트 완료 건수</span>
                        <span className="font-semibold text-blue-600">50+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">평균 만족도</span>
                        <span className="font-semibold text-green-600">98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">평균 프로젝트 기간</span>
                        <span className="font-semibold text-purple-600">12주</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">활성 유지보수</span>
                        <span className="font-semibold text-orange-600">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  관련 서비스
                </h2>
                <p className="text-lg text-gray-600">
                  함께 고려해볼 만한 다른 서비스들을 확인해보세요
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {relatedServices.map((relatedService) => (
                  <Card key={relatedService.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        <Link href={`/services/${relatedService.slug}`}>
                          {relatedService.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedService.description}
                      </p>
                      <Link href={`/services/${relatedService.slug}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                          자세히 보기
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/services">
                  <Button variant="outline" size="lg">
                    모든 서비스 보기
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {service.title}로 비즈니스 혁신을 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              전문가와의 자세한 상담을 통해 귀사에最適한 솔루션을 제안해드리겠습니다.
              지금 바로 첫 걸음을 내딛어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  무료 상담 신청하기
                </Button>
              </Link>
              <a href="tel:+82-2-123-4567">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  바로 전화하기
                </Button>
              </a>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              📞 전문 컨설턴트가 친절하게 안내해드리겠습니다
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
