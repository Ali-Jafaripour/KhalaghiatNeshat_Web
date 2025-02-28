import React from 'react';

const HoverEffect: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', transition: 'transform 0.2s', cursor: 'pointer', ':hover': { transform: 'scale(1.05)' } }}>
      <p>Hover over me!</p>
    </div>
  );
};

export default HoverEffect;