"use client";

import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";

import InputContainer from "../InputContainer";

const PLACEHOLDERS = [
  "Find all restaurants that are no more than 200m away from a bus stop in Berlin.",
  "Give me all the public parks that have a fountain in the city of Köln.",
  "Hey! I want to know all the malls in Hamburg where I can find an ALDI supermarket.",
];

const NaturalLanguageInputStep = () => {
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [typingActive, setTypingActive] = useState(true);
  const nextStep = useAppStore((state) => state.nextStep);
  const setNlSentence = useImrStore((state) => state.setNlSentence);
  const nlSentence = useImrStore((state) => state.nlSentence);
  const handleSearchClick = () => {
    setShouldUnmount(true);
    setTimeout(() => {
      nextStep();
    }, 200);
  };

  const [currentText, setCurrentText] = useState<string>("");
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    if (!typingActive) return;
    let timeoutId: NodeJS.Timeout;

    if (direction === "forward") {
      if (currentText === PLACEHOLDERS[placeholderIndex]) {
        timeoutId = setTimeout(() => setDirection("backward"), 1000);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(
            PLACEHOLDERS[placeholderIndex].substring(0, currentText.length + 1)
          );
        }, 50);
      }
    } else {
      if (currentText === "") {
        timeoutId = setTimeout(() => {
          setPlaceholderIndex(
            (prevIndex) => (prevIndex + 1) % PLACEHOLDERS.length
          );
          setDirection("forward");
        }, 1000);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, 50);
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentText, direction, placeholderIndex, typingActive]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShow) => !prevShow);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  const displayedText = `${currentText}${
    showCursor && typingActive ? "|" : ""
  }`;

  return (
    <InputContainer shouldUnmount={shouldUnmount}>
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="flex flex-col w-full gap-2">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <Textarea
              className="w-full text-xl shadow-lg"
              rows={4}
              placeholder={displayedText}
              onChange={(e) => setNlSentence(e.target.value)}
              onFocus={() => {
                setTypingActive(false);
                setCurrentText("");
              }}
              onBlur={() => setTypingActive(true)}
            />
            <Button
              onClick={handleSearchClick}
              disabled={nlSentence === ""}
              type="submit"
            >
              <SearchIcon />
              Search
            </Button>
          </form>
        </div>
      </div>
    </InputContainer>
  );
};

export default NaturalLanguageInputStep;
