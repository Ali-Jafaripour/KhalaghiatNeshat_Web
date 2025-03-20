import React, { useEffect, useState, useRef } from 'react';

const Test: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once the component is visible
          }
        });
      },
      {
        threshold: 0.8, // Trigger when 10% of the component is visible
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounter = () => {
        const duration = 9000; // 4 seconds
        const startTime = performance.now();
        const startCount = 0;
        const endCount = 156;

        const updateCounter = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentCount = Math.ceil(progress * endCount); 

          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };

        requestAnimationFrame(updateCounter);
      };

      animateCounter();
    }
  }, [isVisible]);

  return (
    <div ref={componentRef} className="flex justify-center items-center  bg-transparent text-white">
      <h1 className="text-center">
        <span className="count block lg:text-[50vh] text-[17vh]  text-primary-2 font-Potk">{count}</span>
        <p className='font-Potk text-primary-1'>تعداد ثبت نامی ها تا همین لحظه ! </p> 
      </h1>
    </div>
  );
};

export default Test;
