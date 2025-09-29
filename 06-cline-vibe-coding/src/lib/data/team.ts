import type { TeamMember } from "@/types/index"

export const teamMembers: TeamMember[] = [
  {
    id: "kim-tech",
    name: "김기술",
    position: "CTO",
    bio: "15년 경력의 기술 전문가로, 최신 기술 트렌드와 시스템 아키텍처 디자인에 깊은 이해를 가지고 있습니다.",
    avatar: "/avatars/kim-tech.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kim-tech",
      github: "https://github.com/kim-tech"
    }
  },
  {
    id: "lee-business",
    name: "이비즈",
    position: "CEO",
    bio: "사업 전략과 비즈니스 개발 분야에서 20년 이상 경력을 쌓았습니다. 혁신적인 비즈니스 모델 개발에 강점을 가지고 있습니다.",
    avatar: "/avatars/lee-business.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/lee-business"
    }
  },
  {
    id: "park-design",
    name: "박디자인",
    position: "Head of Design",
    bio: "사용자 중심 디자인 철학을 바탕으로 UI/UX 디자인과 브랜딩 전략을 10년 이상 수행해온 전문가입니다.",
    avatar: "/avatars/park-design.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/park-design"
    }
  },
  {
    id: "choi-project",
    name: "최프로젝트",
    position: "Project Manager",
    bio: "대규모 프로젝트 관리와 팀 코디네이션 분야에서 다년간 경험을 쌓았습니다. 성공적인 프로젝트 실행을 위한 전략적 접근을 전문으로 합니다.",
    avatar: "/avatars/choi-project.jpg"
  },
  {
    id: "jung-data",
    name: "정데이터",
    position: "Data Scientist",
    bio: "머신러닝과 데이터 분석 분야의 베테랑으로, 빅데이터 기반의 비즈니스 인사이트 도출에 특화되어 있습니다.",
    avatar: "/avatars/jung-data.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/jung-data",
      github: "https://github.com/jung-data"
    }
  },
  {
    id: "han-marketing",
    name: "한마케팅",
    position: "CMO",
    bio: "디지털 마케팅과 브랜드 전략 분야에서 12년 경력을 보유한 마케팅 전문가입니다.",
    avatar: "/avatars/han-marketing.jpg"
  }
]

export const coreValues = [
  {
    title: "Innovation",
    description: "최신 기술 트렌드를 선도하고 혁신적인 솔루션으로 고객의 경쟁력을 강화합니다.",
    icon: "🚀"
  },
  {
    title: "Collaboration",
    description: "고객과 파트너와의 신뢰를 바탕으로 함께 성장하는 협동의 문화를 추구합니다.",
    icon: "🤝"
  },
  {
    title: "Excellence",
    description: "최고 품질의 결과물과 서비스로 고객 만족을 극대화합니다.",
    icon: "⭐"
  },
  {
    title: "Growth",
    description: "기술 발전과 시장 변화에 적극적으로 대응하며 지속적인 성장을 추구합니다.",
    icon: "📈"
  }
]
