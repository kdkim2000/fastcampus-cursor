import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogSection } from "@/components/sections/blog-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogPosts } from "@/lib/data/blog"
import Link from "next/link"
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react"

export default function BlogPage() {
  // 인기 태그 계산
  const tagCount = blogPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const popularTags = Object.entries(tagCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8)
    .map(([tag]) => tag)

  // 최신 포스트들 가져오기
  const recentPosts = blogPosts.slice(0, 9)

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-700 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute top-40 right-16 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              기술 인사이트 & 트렌드
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              최신 기술 동향과 비즈니스 인사이트를 공유합니다.
              귀사의 디지털 혁신을 위한 유익한 정보와 전략을 제공합니다.
            </p>
          </div>
        </section>

        {/* Blog Content Grid with Sidebar */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Post */}
                {recentPosts.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">추천 포스트</h2>
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {recentPosts[0].tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            <Link
                              href={`/blog/${recentPosts[0].id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {recentPosts[0].title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-6 line-clamp-3">
                            {recentPosts[0].excerpt}
                          </p>

                          <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {recentPosts[0].author.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {recentPosts[0].createdAt.toLocaleDateString('ko-KR')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {Math.ceil(recentPosts[0].excerpt.split(' ').length / 200)}분
                            </div>
                          </div>

                          <Link href={`/blog/${recentPosts[0].id}`}>
                            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                              읽기
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>

                        <div className="relative h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                          <span className="text-gray-500">블로그 이미지</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Posts Grid */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">최신 포스트</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {recentPosts.slice(1).map((post) => (
                      <article key={post.id} className="group">
                        <div className="bg-gray-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            <Link href={`/blog/${post.id}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {post.author.name}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.createdAt.toLocaleDateString('ko-KR')}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {Math.ceil(post.excerpt.split(' ').length / 200)}분
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            읽기
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Load More or Pagination would go here */}
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      size="lg"
                      disabled
                      className="opacity-50 cursor-not-allowed"
                    >
                      더 많은 포스트 보기 (준비 중)
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Search Box */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">포스트 검색</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="검색어를 입력하세요"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    검색 기능(준비 중)
                  </p>
                </div>

                {/* Popular Tags */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">인기 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100 transition-colors"
                        title={`태그 필터링: ${tag} (준비 중)`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    태그 필터링 기능(준비 중)
                  </p>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-xl">
                  <h3 className="font-semibold mb-4">💌 뉴스레터 구독</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    최신 블로그 포스트와 기술 트렌드를 메일로 받아보세요.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="이메일 주소"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-blue-200 backdrop-blur-sm"
                      disabled
                    />
                    <Button
                      size="sm"
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                      disabled
                    >
                      구독하기
                    </Button>
                  </div>
                  <p className="text-xs text-blue-200 mt-2">
                    뉴스레터 기능(준비 중)
                  </p>
                </div>

                {/* Blog Stats */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">블로그 통계</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">총 포스트</span>
                      <span className="font-semibold text-blue-600">{blogPosts.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">작성자 수</span>
                      <span className="font-semibold text-green-600">
                        {new Set(blogPosts.map(p => p.author.name)).size}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">전체 태그</span>
                      <span className="font-semibold text-purple-600">
                        {Object.keys(tagCount).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">평균 읽기 시간</span>
                      <span className="font-semibold text-orange-600">5분</span>
                    </div>
                  </div>
                </div>

                {/* Recent Posts Sidebar */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">최근 포스트</h3>
                  <div className="space-y-4">
                    {recentPosts.slice(0, 5).map((post) => (
                      <div key={post.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-gray-900 mb-2">
                          <Link
                            href={`/blog/${post.id}`}
                            className="hover:text-blue-600 transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.createdAt.toLocaleDateString('ko-KR')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              기술 트렌드와 함께 성장하세요
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              우리의 블로그에서 최신 기술 동향과 전문가 인사이트를 확인하세요.
              귀사의 디지털 혁신에 도움이 되는 다양한 콘텐츠를 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  서비스 알아보기
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold"
                >
                  전문가 상담 받기
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
