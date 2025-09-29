import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { teamMembers, coreValues } from "@/lib/data/team"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-32 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              혁신을 리드하는 파트너
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              우리는 기술과 사람의 조화를 통해 비즈니스의 미래를 만들어갑니다.
              고객의 성공이 곧 우리의 성공입니다.
            </p>
          </div>
        </section>

        {/* 회사 소개 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                우리는 누구인가
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-left">
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    디지털 혁신의 시대에 리더로서의 책임을 다하고 있는 기술 기업입니다.
                    최첨단 기술력과 풍부한 경험을 바탕으로 고객의 비즈니스 목표 달성을 위해
                    최적화된 솔루션을 제공합니다.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    우리는 단순한 서비스 제공자가 아니라 고객과의 장기적인 파트너십을 추구합니다.
                    기술 전환의 여정에서 함께 성장하고, 새로운 가치를 창출하는 동반자가 되겠습니다.
                  </p>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">핵심 역량</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      클라우드 네이티브 아키텍처 및 DevOps 전문성
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      AI/ML 기반 데이터 분석 및 비즈니스 인텔리전스
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      제로 트러스트 보안 아키텍처 구현
                    </li>
                    <li className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      모던 웹/모바일 애플리케이션 개발
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 핵심 가치 */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                우리의 핵심 가치
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                이러한 가치들은 우리의 모든 행동과 의사결정의 기반이 됩니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 팀 소개 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                전문가 팀
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                각 분야의 베테랑 전문가들이 모여 최고의 팀을 구성하고 있습니다.
                풍부한 경험과 최신 지식을 바탕으로 고객의 성공을 보장합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    {/* 프로필 이미지 자리 */}
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                      <span className="text-gray-600 font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </CardTitle>

                    <div className="text-blue-600 font-medium mb-4">
                      {member.position}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* 소셜 링크 */}
                    {member.socialLinks && (
                      <div className="flex justify-center space-x-4">
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 연혁 / 마일스톤 */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  우리의 여정
                </h2>
                <p className="text-lg text-gray-600">
                  15년간의 기술 혁신과 성장 스토리
                </p>
              </div>

              <div className="relative">
                {/* 타임라인 라인 */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-blue-300 h-full" />

                <div className="space-y-12">
                  {[
                    { year: "2024", title: "글로벌 확장", desc: "아시아 시장 진출 및 파트너십 확대" },
                    { year: "2022", title: "AI/ML 특화", desc: "데이터 과학팀 신설 및 AI 기반 서비스 론칭" },
                    { year: "2020", title: "클라우드 전환", desc: "100% 클라우드 기반 운영 체계 구축" },
                    { year: "2018", title: "보안 전문", desc: "제로 트러스트 보안 아키텍처 전문성 확보" },
                    { year: "2016", title: "팀 확장", desc: "핵심 인력 채용 및 실무 전문가 영입" },
                    { year: "2014", title: "회사 설립", desc: "기술 컨설팅 기업으로 출발" },
                    { year: "2010", title: "기반 구축", desc: "러닝 스페이스가 된 시기의 시작" }
                  ].map((milestone, index) => (
                    <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* 밀리시톤 콘텐츠 */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-4">
                            <Badge variant="secondary" className="text-lg font-bold">
                              {milestone.year}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.desc}
                          </p>
                        </div>
                      </div>

                      {/* 타임라인 도트 */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 연락처 및 CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              디지털 트랜스포메이션의 여정에서 우리의 전문성과 경험을 활용해보세요.
              귀사의 성공을 위한 최적의 솔루션을 함께 만들어가겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
              >
                문의하기
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                서비스 보기
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
