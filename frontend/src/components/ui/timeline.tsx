"use client"
import { useScroll, motion, useInView } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "-100px" })
  const [activeIndices, setActiveIndices] = useState<boolean[]>(new Array(data.length).fill(false))
// @ts-ignore
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 40%"],
  })

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const elements = containerRef.current.querySelectorAll(".timeline-dot")
      const newActiveIndices = [...activeIndices]

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const isActive = rect.top <= viewportHeight * 0.6
        if (newActiveIndices[index] !== isActive) {
          newActiveIndices[index] = isActive
        }
      })

      setActiveIndices(newActiveIndices)
    }

    const throttledScroll = throttle(handleScroll, 100)
    window.addEventListener("scroll", throttledScroll)
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [activeIndices])

  return (
    <div className="w-full h-full md:px-10" ref={containerRef}>
      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} isActive={activeIndices[index]} isInView={isInView} />
        ))}

        <motion.div
          className="absolute md:left-8 left-8 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-primary-3 to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}

const TimelineItem = React.memo(
  ({
    item,
    index,
    isActive,
    isInView,
  }: {
    item: TimelineEntry
    index: number
    isActive: boolean
    isInView: boolean
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex justify-start pt-10 md:pt-40 md:gap-10"
      >
        <div className="absolote flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
          <motion.div
            className="timeline-dot h-8 w-8 lg:h-10 lg:w-10 absolute left-4 lg:left-3  rounded-full flex items-center justify-center"
            animate={{
              backgroundColor: isActive ? "#ff6000" : "#4f4742",
              scale: isActive ? 1.2 : 1,
              rotate:isActive ? 360 : 138,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-[18px] w-[18px] lg:h-5 lg:w-5 rounded-md border p-1"
              animate={{
                backgroundColor: isActive ? "#fab566" : "#e5e5e5",
                borderColor: isActive ? "#ff6000" : "#d4d4d4",
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 font-Peyda">
            {item.title}
          </h3>
        </div>

        <div className="relative pl-20 pr-4 md:pl-4 w-full">
          <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">{item.title}</h3>
          {item.content}
        </div>
      </motion.div>
    )
  },
)

function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return (...args: any[]) => {
    if (!inThrottle) {
      func.apply(undefined, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

