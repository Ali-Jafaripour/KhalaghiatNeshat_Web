import React, { useState } from 'react';
import { useTrail, a } from '@react-spring/web';
import styles from './styles.module.css';

// استفاده از React.PropsWithChildren برای اضافه کردن children به پروپ‌ها
const Trail: React.FC<React.PropsWithChildren<{ open: boolean }>> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function App() {
  const [open, set] = useState(true);
  return (
    <div className={styles.container} onClick={() => set((state) => !state)}>
      <Trail open={open}>
        <p className='font-Potk h-32 p-6'>خـلاقـیـت و نـشـــاط </p>
        <span className='w-full flex flex-row gap-8 content-center'>
        <p className='font-Peyda p-2 text-4xl h-32 text-[#d6ba9a] flex items-center'>انجمن  علمی  مهندسی  کامپیوتر</p>
        <p className='font-Peyda p-2 text-7xl h-32 text-[#d6ba9a]  flex items-center'>هفتمین دوره</p>
        </span>
      </Trail>
    </div>
  );
}