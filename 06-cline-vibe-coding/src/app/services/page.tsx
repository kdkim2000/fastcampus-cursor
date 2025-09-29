import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServicesSection } from "@/components/sections/services-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-40 right-16 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              전문적인 서비스 포트폴리오
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              최신 기술을 활용한 혁신적인 솔루션으로 귀사의 비즈니스 발전을 지원합니다.
              각 서비스를 자세히 살펴보고 귀사에最適한 솔루션을 찾아보세요.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesSection variant="default" />

        {/* Specialized Solutions Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                맞춤형 솔루션 개발
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                귀사의 특정 요구사항에 맞춰 특별히 설계된 맞춤형 솔루션을 제공합니다.
                독특한 비즈니스 모델과 기술적 과제에 대한 최적의 해결책을 찾아드립니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Custom Solutions Cards */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-blue-600 text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">신기술 PoC</h3>
                <p className="text-gray-600 mb-6">
                  새로운 기술의 실현 가능성을 검증하고 비즈니스 가치를 입증하는 개념 증명 프로젝트를 수행합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 기술 실현 가능성 평가</li>
                  <li>• 비즈니스 케이스 개발</li>
                  <li>• 프로토타입 구축</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-green-600 text-xl">🔄</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">레거시 시스템 현대화</h3>
                <p className="text-gray-600 mb-6">
                  구형 시스템을 클라우드 네이티브 아키텍처로 전환하여 비용 절감과 성능 향상을 동시에 달성합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 성능 분석 및 최적화</li>
                  <li>• 단계적 마이그레이션</li>
                  <li>• 유지보수 효율성 개선</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-purple-600 text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 거버넌스 구축</h3>
                <p className="text-gray-600 mb-6">
                  데이터의 품질, 보안, 사용성을 체계적으로 관리하여 데이터 기반 의사결정 능력을 강화합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 데이터 카탈로그 구축</li>
                  <li>• 품질 관리 체계 수립</li>
                  <li>• 컴플라이언스 준수</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  맞춤 솔루션 상담 신청
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                서비스 진행 과정
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                체계적이고 투명한 프로세스로 귀사의 만족을 최우선으로 하여 프로젝트를 진행합니다.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform -translate-x-1/2" />

              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-1">
                {[
                  {
                    step: "01",
                    title: "요구사항 분석 및 기획",
                    description: "귀사의 현재 상황과 목표를 철저히 분석하여 최적의 솔루션을 기획합니다.",
                    duration: "1-2주"
                  },
                  {
                    step: "02",
                    title: "제안 및 계약",
                    description: "상세한 제안서를 제공하고 프로젝트 범위와 일정을 확정합니다.",
                    duration: "1주"
                  },
                  {
                    step: "03",
                    title: "설계 및 개발",
                    description: "기술 아키텍처를 설계하고 솔루션을 개발합니다. 정기적인 리뷰를 통해 진행 상황을 공유합니다.",
                    duration: "4-12주"
                  },
                  {
                    step: "04",
                    title: "테스트 및 배포",
                    description: "철저한 테스트를 통해 품질을 검증하고 안정적으로 배포합니다.",
                    duration: "2-3주"
                  },
                  {
                    step: "05",
                    title: "운영 지원 및 교육",
                    description: "시스템 운영을 지원하고 사용자 교육을 제공합니다.",
                    duration: "연속"
                  }
                ].map((phase, index) => (
                  <div key={phase.step} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                            {phase.step}
                          </div>
                          <div className="text-sm text-blue-600 font-semibold">
                            약 {phase.duration}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {phase.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 바로 상담을 시작하세요
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              귀사의 디지털 트랜스포메이션 여정을 함께할 준비가 되어 있습니다.
              전문가와의 상담을 통해 최적의 솔루션을 찾아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  상담 신청하기
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                >
                  회사 더 알아보기
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
