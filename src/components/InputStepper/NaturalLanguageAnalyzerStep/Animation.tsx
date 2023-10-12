import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

const SENTENCES = [
  "Identifying the area in your query",
  "Determining all objects in your prompt",
  "Analyzing the connections between the objects",
  "Hang on, we're almost there!",
];

const AnalyzeAnimation = () => {
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
      if (index < SENTENCES.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
        setKey((prevKey) => prevKey + 1);
      }
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <animated.div style={props} className="text-center">
      {SENTENCES[index]}
    </animated.div>
  );
};

export default React.memo(AnalyzeAnimation);
