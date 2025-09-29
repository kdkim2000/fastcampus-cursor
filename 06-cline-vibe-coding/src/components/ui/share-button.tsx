'use client'

import { useState } from 'react'
import { Button } from './button'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  className?: string
  title?: string
  children?: React.ReactNode
}

export function ShareButton({ className, title, children }: ShareButtonProps) {
  const [isShared, setIsShared] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Use native share API if available
        await navigator.share({
          title: document.title,
          url: window.location.href,
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setIsShared(true)
        setTimeout(() => setIsShared(false), 3000)
      }
    } catch (error) {
      console.error('Failed to share:', error)
      // Fallback - copy to clipboard using the old method
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setIsShared(true)
        setTimeout(() => setIsShared(false), 3000)
      } catch (err) {
        console.error('Fallback copy failed:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      title={title || "링크 공유하기"}
      className={className}
    >
      <Share2 className="h-4 w-4 mr-2" />
      {isShared ? "링크 복사됨!" : children || "공유"}
    </Button>
  )
}
