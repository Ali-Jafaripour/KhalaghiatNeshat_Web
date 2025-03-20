"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndices, setActiveIndices] = useState<boolean[]>(new Array(data.length).fill(false));

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 43%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const elements = document.querySelectorAll('.timeline-dot');
    const newActiveIndices = [...activeIndices];
    
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isActive = rect.top <= viewportHeight * 0.6;
      newActiveIndices[index] = isActive;
    });
    
    setActiveIndices(newActiveIndices);
  });

  return (
    <div
      className="w-full h-full md:px-10"
      ref={containerRef}
    >
      {/* <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-primary-1  max-w-4xl font-Peyda ">
          .....خلاقیت نـشـــاط روزی 
        </h2>
        <p className="text-primary-3 text-sm md:text-base max-w-sm font-Peyda">
         .....یه سری چرت و پرت برای این رویداد 
        </p>
      </div> */}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="absolote flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                className="timeline-dot h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center "
                animate={{
                  backgroundColor: activeIndices[index] ? "#ff6000" : "#4f4742",
                  scale: activeIndices[index] ? 1.2 : 1,
                  rotate: activeIndices[index] ? 180 : 0,
               
                }}
                initial={{ backgroundColor: "white", scale: 1, rotate: 0  }}
                transition={{ 
                  duration: .9,
                  ease: "easeOut"
                }}
              >
                <motion.div 
                  className="h-4 w-4 rounded-md border p-2"
                  animate={{
                    backgroundColor: activeIndices[index] ? "#fab566" : "#e5e5e5",
                    borderColor: activeIndices[index] ? "#ff6000" : "#d4d4d4",
                    scale: activeIndices[index] ? 1.2 : 1,
                  }}
                  initial={{ backgroundColor: "#e5e5e5", borderColor: "#d4d4d4", scale: 1 }}
                  transition={{ duration: 1.5 , ease: "easeOut" }}
                />
              </motion.div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500  font-Peyda ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#fab566] via-[#ff6000] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
