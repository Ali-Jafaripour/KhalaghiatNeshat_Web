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
        const duration = 9000;
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
      {showAnimation && (
        <DotLottieReact
          src="https://lottie.host/fed3369a-1411-41e8-b7bb-b33aaea70d8a/PbKjIt09yz.lottie"
          loop
          autoplay
          className='absolute -z-0 w-full'
        />
      )}
      <h1 className="text-center z-10">
        <span className="count block lg:text-[50vh] text-[17vh]  text-primary-2 font-Potk">{count}</span>
        <p className='font-Potk text-primary-1'>تعداد ثبت نامی ها تا همین لحظه ! </p> 
      </h1>
    </div>
  );
};

export default Test;
