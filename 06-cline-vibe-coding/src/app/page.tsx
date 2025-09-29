import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { StatsSection } from "@/components/sections/stats-section"
import { BlogSection } from "@/components/sections/blog-section"
import { PartnersSection } from "@/components/sections/partners-section"

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 */}
        <HeroSection />

        {/* 서비스 섹션 */}
        <ServicesSection />

        {/* 통계 섹션 */}
        <StatsSection variant="featured" />

        {/* 블로그 섹션 */}
        <BlogSection />

        {/* 파트너 섹션 */}
        <PartnersSection variant="showcase" />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
