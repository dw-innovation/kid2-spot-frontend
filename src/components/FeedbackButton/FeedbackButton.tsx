import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

import FeedbackIcon from "@/assets/icons/FeedbackIcon";
import ThumbIcon from "@/assets/icons/ThumbIcon";
import { saveFeedback } from "@/lib/feedback";
import useSaveSession from "@/lib/hooks/useSaveSession";

import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const FeedbackButton = () => {
  const [sessionLink, setSessionLink] = useState<string | undefined>();
  const [currentFeedbackID, setCurrentFeedbackID] = useState<
    string | undefined
  >();
  const [stripeWidth, setStripeWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const [thumbsGiven, setThumbsGiven] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setStripeWidth(ref.current.clientWidth);
    }
  }, [ref]);

  const sessionMutation = useSaveSession({});

  const submitFeedback = useMutation({
    mutationFn: async (thumbsFeedback?: boolean, textFeedback?: string) => {
      let currentSessionLink;
      if (!sessionLink) {
        const newLink = await sessionMutation.mutateAsync();
        currentSessionLink = newLink;
        setSessionLink(newLink);
      } else {
        currentSessionLink = sessionLink;
      }

      return await saveFeedback(
        currentSessionLink,
        thumbsFeedback,
        textFeedback,
        currentFeedbackID
      );
    },
    onSettled(data, variables, context) {
      setCurrentFeedbackID(data);
      console.log(data, variables, context);
    },
  });

  return (
    <div
      className="flex items-center gap-1 hover:brighter font-noto fixed right-0 bottom-[12.5%]  transition-all"
      style={{
        transform: `translateX(${hover ? 0 : stripeWidth + 8}px)`,
        zIndex: 100000,
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="grid grid-cols-[auto,1fr]">
        <div className="p-2 col-span-1 bg-blue-500 rounded-l-md  flex items-center gap-1 hover:brighter font-noto right-0 bottom-[12.5%] flex-col">
          <div className="text-white">
            {sessionMutation.isPending ? <LoadingSpinner /> : <FeedbackIcon />}
          </div>
        </div>
        <div className="col-span-1 bg-white" ref={ref}>
          <div className="flex gap-2 flex-col p-2 items-center">
            <span className="text-sm font-bold text-orange-600">
              Do you enjoy using SPOT?
            </span>
            <div className="flex gap-4">
              <button
                className="text-green-500 hover:text-green-700 disabled:text-gray-500"
                onClick={() => submitFeedback.mutate(true)}
                disabled={!!currentFeedbackID}
              >
                <ThumbIcon />
              </button>
              <button
                className="text-orange-500 hover:text-orange-700 rotate-180 disabled:text-gray-500"
                onClick={() => submitFeedback.mutate(false)}
                disabled={!!currentFeedbackID}
              >
                <ThumbIcon />
              </button>
            </div>
          </div>
        </div>
        {/*    <div
          className="col-span-1 col-start-2 bg-white transition-all"
          style={{
            transform: `translateX(${
              currentFeedbackID ? 0 : stripeWidth + 8
            }px)`,
          }}
        >
          <form className="flex flex-col p-2 gap-2">
            <textarea className="border rounded-sm text-sm p-2"></textarea>
            <Button type="button" variant="secondary" size="sm">
              submit
            </Button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default FeedbackButton;
