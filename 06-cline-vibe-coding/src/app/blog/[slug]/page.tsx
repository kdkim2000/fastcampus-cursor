import { notFound } from 'next/navigation'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShareButton } from "@/components/ui/share-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/data/blog"
import { getPostBySlug, getAllPosts } from "@/lib/utils/markdownd"
import { BlogPost } from "@/types/index"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const markdownPosts = await getAllPosts()
    const slugs = markdownPosts.map((post) => ({ slug: post.id }))

    // 기존 데이터베이스의 포스트들도 포함
    blogPosts.forEach((post) => {
      if (!markdownPosts.find((mdPost) => mdPost.id === post.id)) {
        slugs.push({ slug: post.id })
      }
    })

    return slugs
  } catch (error) {
    console.error('Error generating static params:', error)
    return blogPosts.map((post) => ({
      slug: post.id,
    }))
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  try {
    // 먼저 MD 파일에서 찾기
    const post = await getPostBySlug(slug)

    if (post) {
      return {
        title: `${post.title} - Company Blog`,
        description: post.excerpt,
      }
    }
  } catch (error) {
    console.error('Error reading MD post:', error)
  }

  // MD 파일이 없으면 기존 데이터베이스에서 찾기
  const post = blogPosts.find((p) => p.id === slug)

  if (!post) {
    return {
      title: '포스트를 찾을 수 없습니다',
    }
  }

  return {
    title: `${post.title} - Company Blog`,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  let post: BlogPost | undefined = undefined

  try {
    // 먼저 MD 파일에서 찾기
    const mdPost = await getPostBySlug(slug)
    if (mdPost) {
      post = mdPost
    }
  } catch (error) {
    console.error('Error reading MD post:', error)
  }

  // MD 파일이 없으면 기존 데이터베이스에서 찾기
  if (!post) {
    post = blogPosts.find((p) => p.id === slug)
  }

  if (!post) {
    notFound()
  }

  // 읽기 시간 계산
  const readTime = Math.ceil(post.content.split(' ').length / 200)

  // 관련 포스트 추천 (현재 포스트 제외)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id &&
      p.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, 3)

  // 다음 포스트
  const currentIndex = blogPosts.findIndex(p => p.id === post.id)
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-700 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </div>

          {/* Back Navigation */}
          <div className="relative z-10 container mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-green-100 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              블로그 목록으로 돌아가기
            </Link>

            <div className="max-w-4xl">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-green-100">
                  <User className="h-5 w-5 mr-2" />
                  {post.author.name}
                </div>
                <div className="flex items-center text-green-100">
                  <Calendar className="h-5 w-5 mr-2" />
                  {post.createdAt.toLocaleDateString('ko-KR')}
                </div>
                <div className="flex items-center text-green-100">
                  <Clock className="h-5 w-5 mr-2" />
                  {readTime}분 읽기
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-green-100 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                {/* Content */}
                <div className="leading-relaxed text-gray-700">
                  {post.content && (
                    <div dangerouslySetInnerHTML={{
                      __html: post.content.replace(/\n/g, '<br />').replace(/<br \/>/g, '</p><p>')
                    }} />
                  )}
                </div>

                {/* Share Section */}
                <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">이 포스트가 유용했나요?</h3>
                      <p className="text-sm text-gray-600">친구들과 공유해보세요</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ShareButton
                        title="링크 공유하기"
                      >
                        공유
                      </ShareButton>
                    </div>
                  </div>
                </div>
              </article>

              {/* Author Bio */}
              <Card className="mt-12">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-bold text-xl">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        작성자: {post.author.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.author.bio}
                      </p>
                      <div className="flex space-x-3">
                        {/* 소셜 링크들은 블로그 데이터에서 실제로 제공되는 경우에 한해 표시됨 */}
                        {post.author.socialLinks?.linkedin && (
                          <a
                            href={post.author.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                        {post.author.socialLinks?.github && (
                          <a
                            href={post.author.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                  관련 포스트
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${relatedPost.id}`}>
                            {relatedPost.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {relatedPost.author.name}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {Math.ceil(relatedPost.content.split(' ').length / 200)}분
                          </div>
                        </div>

                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          읽기
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Next Post / CTA */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            {nextPost ? (
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  다음 포스트 읽기
                </h2>
                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8 bg-white text-gray-900">
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {nextPost.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {nextPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {nextPost.excerpt}
                    </p>
                    <Link href={`/blog/${nextPost.id}`}>
                      <Button className="w-full">
                        다음 포스트 읽기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  더 많은 콘텐츠를 만나보세요
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  우리의 블로그에는 귀사의 비즈니스 혁신에 도움이 되는 다양한 인사이트가 가득합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/blog">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                    >
                      모든 포스트 보기
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                    >
                      서비스 알아보기
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
