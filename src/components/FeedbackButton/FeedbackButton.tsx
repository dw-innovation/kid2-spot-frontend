import React, { useEffect, useRef, useState } from "react";

import FeedbackIcon from "@/assets/icons/FeedbackIcon";

const FeedbackButton = () => {
  const [stripeWidth, setStripeWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      setStripeWidth(ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <>
      <a
        href={process.env.NEXT_PUBLIC_FEEDBACK_URL}
        target="_blank"
        className="flex items-center gap-1 text-white bg-blue-500 hover:brighter p-2 font-noto cursor-pointer fixed right-0 bottom-[12.5%]"
        rel="noopener noreferrer"
        style={{
          transform: `translateX(${hover ? 0 : stripeWidth + 8}px)`,
          zIndex: 100000,
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className="pr-1">
          <FeedbackIcon />
        </div>
        <span ref={ref}>send feedback</span>
      </a>
    </>
  );
};
export default FeedbackButton;
