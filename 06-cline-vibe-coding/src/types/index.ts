export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  content?: string;
  features: string[];
  targetAudience: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author: {
    name: string;
    avatar: string;
    bio: string;
    socialLinks?: {
      linkedin?: string;
      github?: string;
    };
  };
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
  };
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface ContactForm {
  name: string;
  email: string;
  companyName?: string;
  type: 'inquiry' | 'partnership' | 'support' | 'other';
  message: string;
}

export interface Counter {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface CarouselItem {
  id: string
  content: React.ReactNode
  logo?: string
  name?: string
}
