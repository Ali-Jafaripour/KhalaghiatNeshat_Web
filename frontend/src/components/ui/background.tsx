interface GrainyBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string; // Optional prop
  opacity?: number; // Optional prop
}

const GrainyBackground: React.FC<GrainyBackgroundProps> = ({
  children,
  // backgroundColor = '101010', 
  backgroundColor = '101010', // Default value

  opacity = 0.2, // Default value
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        backgroundColor, // Use the prop
        overflow: 'hidden',
      }}
    >
      {/* Grainy overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+")`,
          opacity, // Use the prop
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
};

export default GrainyBackground;