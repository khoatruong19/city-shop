import { useState } from 'react';
import { animated, useSpring } from 'react-spring';

const MovingText = ({ text }: { text: string }) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: 'translate(-100%,0)' },
    to: { transform: 'translate(100%,0)' },
    config: { duration: 5000 },
    reset: true,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <div key={key}>
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
};

export default MovingText;
