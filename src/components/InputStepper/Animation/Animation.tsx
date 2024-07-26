import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

type Props = {
  sentences: string[];
  duration: number;
};

const AnalyzeAnimation = ({ sentences, duration }: Props) => {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const props = useSpring({
    to: { opacity: 1, transform: "translateY(0%)" },
    from: { opacity: 0, transform: "translateY(-100%)" },
    key,
    reset: true,
    config: { tension: 200, friction: 50 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (index < sentences.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setKey((prevKey) => prevKey + 1);
      }
    }, duration);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <animated.div style={props} className="leading-4 text-center">
      {sentences[index]}
    </animated.div>
  );
};

export default React.memo(AnalyzeAnimation);
