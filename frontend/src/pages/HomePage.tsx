"use client"
import React from "react"
import { motion } from "framer-motion"
import { Timeline } from "../components/ui/timeline"
import { OptimizedImage } from "../components/ui/image-grid"
import { Footer, Header,Test } from '../components';
import img from '../../public/images/IMG_ef5925.webp'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Test/>
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <TimelineDemo />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

const imageAnimations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 90, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 10,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
}

export function TimelineDemo() {
  const timelineData = React.useMemo(
    () => [
      {
        title: "افتتاحیه",
        content: (
          <div>
            <p className="text-primary-1 text-xs md:text-sm font-normal mb-8 text-right font-Peyda">
            یه سری چرت و پرت دیگ برای افتتاحیه این رویداد 
            </p>

            <div className="grid grid-cols-2 gap-4">
              <OptimizedImage
                src={img}
                alt="Opening ceremony image 1"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
              />
              <OptimizedImage
                src="/images/IMG_ef2239 (2).webp"
                alt="Opening ceremony image 2"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
              />
              <OptimizedImage
                src="/images/IMG_ef2239 (2).webp"
                alt="Opening ceremony image 3"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
              />
              <OptimizedImage
                src="/images/IMG_ef2239 (3).webp"
                alt="Opening ceremony image 4"
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
              />
            </div>
          </div>
        ),
      },
      {
        title: "مسابقات ",
        content: (
          <div>
            <p className="text-primary-1 text-xs md:text-sm font-normal mb-4 text-right">
            یه جمله در باره ی مسابقات مراسم
            </p>
            <div className="mb-8 flex flex-col justify-center items-end">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             مستر ربات✅  
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             اسکوِید گیم✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             بازی های حرکتی✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             تایپ سریع و برد گیم✅
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
             مسابقه برنامه نویسی✅
            </div>
          </div>

            <motion.div
              variants={imageAnimations.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px", amount: 0.1 }}
              className="h-72 lg:h-auto grid grid-cols-10 grid-rows-7 gap-3 lg:gap-6"
            >
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_G2753.webp"
                  alt="Competition image 1"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_G3336.webp"
                  alt="Competition image 2"
                  className="object-cover h-full w-full"
                />
              </motion.div>

              <motion.div variants={imageAnimations.item} className="col-span-3 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_6732.webp"
                  alt="Competition image 3"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-4 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_2863.webp"
                  alt="Competition image 4"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-3 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_3463.webp"
                  alt="Competition image 5"
                  className="object-cover h-full w-full"
                />
              </motion.div>

              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-3 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_G6244.webp"
                  alt="Competition image 6"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-3 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_G6435.webp"
                  alt="Competition image 7"
                  className="object-cover h-full w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        ),
      },
      {
        title: "اختتامیه",
        content: (
          <div>
            <p className="text-primary-1 text-xs md:text-sm font-normal mb-8">
              یه جمله در باره ی اختتحایه مراسم  
            </p>

            <motion.div
              variants={imageAnimations.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px", amount: 0.1 }}
              className="h-72 lg:h-auto grid grid-cols-10 grid-rows-7 gap-3 lg:gap-6"
            >
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek3578.webp"
                  alt="Closing ceremony image 1"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek3578.webp"
                  alt="Closing ceremony image 2"
                  className="object-cover h-full w-full"
                />
              </motion.div>

              <motion.div variants={imageAnimations.item} className="col-span-7 row-span-3 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek6946.webp"
                  alt="Closing ceremony image 3"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-3 row-span-3 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek2485.webp"
                  alt="Closing ceremony image 4"
                  className="object-cover h-full w-full"
                />
              </motion.div>

              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek3578.webp"
                  alt="Closing ceremony image 5"
                  className="object-cover h-full w-full"
                />
              </motion.div>
              <motion.div variants={imageAnimations.item} className="col-span-5 row-span-2 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/IMG_ek3578.webp"
                  alt="Closing ceremony image 6"
                  className="object-cover h-full w-full"
                />
              </motion.div>
            </motion.div>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="w-full relative">
      <Timeline data={timelineData} />
    </div>
  )
}

