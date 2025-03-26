import React, { useEffect, useState, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Test: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.8, 
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
        const duration = 5000;
        const startTime = performance.now();
        const endCount = 100;

        const updateCounter = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentCount = Math.ceil(progress * endCount); 

          setCount(currentCount);
          setShowAnimation(progress > 0.85); 

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
      <div>
        <h1 className="relative text-center z-30">
          <span className="count block lg:text-[50vh] text-[17vh]  text-primary-2 font-Potk z-30">{count}</span>
          <p className='font-Potk text-primary-1'>تعداد ثبت نامی ها تا همین لحظه ! </p> 
        </h1>
        {showAnimation && (
          <DotLottieReact
            src="https://lottie.host/fed3369a-1411-41e8-b7bb-b33aaea70d8a/PbKjIt09yz.lottie"
            loop
            autoplay
            className='absolute top-[22.5%] lg:top-[20%] left-0 z-10 w-full' />
        )}
      </div>
    </div>
  );
};

export default Test;
