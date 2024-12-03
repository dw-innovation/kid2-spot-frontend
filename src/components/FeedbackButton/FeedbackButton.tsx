import React, { useEffect, useRef, useState } from "react";

import FeedbackIcon from "@/assets/icons/FeedbackIcon";
import useSaveSession from "@/lib/hooks/useSaveSession";

import LoadingSpinner from "../LoadingSpinner";

const FeedbackButton = () => {
  const [stripeWidth, setStripeWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      setStripeWidth(ref.current.clientWidth);
    }
  }, [ref]);

  const mutation = useSaveSession({
    onSuccessCallbacks: [
      (generatedSessionLink) => {
        const feedbackUrlTemplate = process.env.NEXT_PUBLIC_FEEDBACK_URL || "";
        const version = process.env.NEXT_PUBLIC_VERSION || "unknown";

        const feedbackUrl = feedbackUrlTemplate
          .replace("{{VERSION}}", version)
          .replace(
            "{{SESSION_LINK}}",
            encodeURIComponent(generatedSessionLink)
          );

        window.open(feedbackUrl, "_blank", "noopener noreferrer");
      },
    ],
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-white bg-blue-500 hover:brighter p-2 font-noto cursor-pointer fixed right-0 bottom-[12.5%]"
        style={{
          transform: `translateX(${hover ? 0 : stripeWidth + 8}px)`,
          zIndex: 100000,
        }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className="pr-1">
          {mutation.isPending ? <LoadingSpinner /> : <FeedbackIcon />}
        </div>
        <span ref={ref}>send feedback</span>
      </button>
    </div>
  );
};

export default FeedbackButton;
