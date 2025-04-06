"use client"
import type React from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width = 500,
  height = 500,
}) => {
  // Use regular img tag instead of Next.js Image component to avoid process.env issues
  return (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} loading="lazy" width={width} height={height} />
  )
}

