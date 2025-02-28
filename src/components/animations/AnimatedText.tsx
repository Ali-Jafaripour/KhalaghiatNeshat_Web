import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedText: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.from(textRef.current, { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    }
  }, []);

  return (
    <div ref={textRef}>
      <h2>Animated Text</h2>
    </div>
  );
};

export default AnimatedText;