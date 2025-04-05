import React from 'react';

const HoverEffect: React.FC = () => {
  return (
    <div className="p-5 bg-gray-200 rounded-lg transition-transform duration-200 cursor-pointer hover:scale-105">
      <p>Hover over me!</p>
    </div>
  );
};

export default HoverEffect;
