import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import type { BlogPost } from '@/types/index'

const contentDirectory = join(process.cwd(), 'src/content/blog')

interface MarkdownMetadata {
  id: string
  title: string
  excerpt: string
  author: string
  bio: string
  avatar: string
  thumbnail: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function getAllMarkdownSlugs(): string[] {
  try {
    const fileNames = readdirSync(contentDirectory)
    return fileNames.map(fileName => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error reading content directory:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(contentDirectory, `${slug}.md`)
    const fileContents = readFileSync(filePath, 'utf8')

    const file = matter(fileContents)
    const data = file.data as MarkdownMetadata

    // Convert markdown content to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(file.content)
    const content = processedContent.toString()

    return {
      id: data.id || slug,
      title: data.title || '제목 없음',
      excerpt: data.excerpt || '',
      content,
      thumbnail: data.thumbnail || '',
      tags: data.tags || [],
      createdAt: new Date(data.createdAt || '2024-01-01'),
      updatedAt: new Date(data.updatedAt || '2024-01-01'),
      author: {
        name: data.author || '작성자 없음',
        avatar: data.avatar || '',
        bio: data.bio || '',
      }
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllMarkdownSlugs()
  const posts: BlogPost[] = []

  for (const slug of slugs) {
    const post = await getPostBySlug(slug)
    if (post) {
      posts.push(post)
    }
  }

  return posts.sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1))
}
