// LottieIcon.tsx
import React from "react";
import Lottie from "react-lottie";
import { AnimationItem } from "lottie-web"; // Type for the Lottie animation data

// Define props type for LottieIcon
interface LottieIconProps {
  animationData: AnimationItem | any; // Lottie animation data
  width: number;
  height: number;
  loop?: boolean; // Optional, defaults to true
}

const LottieIcon: React.FC<LottieIconProps> = ({ animationData, width, height, loop =true }) => {
  const options = {
    loop, // Loop setting for animation
    autoplay: true, // Start the animation immediately
    animationData, // Pass the animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Maintain aspect ratio
    },
  };

  return <Lottie options={options} height={height} width={width} />;
};

export default LottieIcon;
