import React from "react";
import { animated, useSpring } from "react-spring";

type Props = {
  children?: React.ReactNode;
  shouldUnmount: boolean;
  title?: string;
};

const InputContainer = ({ children, shouldUnmount, title }: Props) => {
  const fadeProps = useSpring({
    to: {
      transform: shouldUnmount ? `scale(0.9)` : `scale(1)`,
      opacity: shouldUnmount ? 0 : 1,
    },
    config: {
      duration: 200,
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  });
  return (
    <animated.div
      className="flex flex-col items-center justify-center h-full gap-2 p-4 bg-white rounded-md shadow-sm"
      style={fadeProps}
    >
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </animated.div>
  );
};

export default InputContainer;
