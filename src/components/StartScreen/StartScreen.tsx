import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import useAppStore from "@/stores/useAppStore";
import useQueryStore from "@/stores/useQueryStore";

import Globe from "../Globe";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const StartScreen = () => {
  const toggleStartScreen = useAppStore((state) => state.toggleStartScreen);
  const setNaturalLanguagePrompt = useQueryStore(
    (state) => state.setNaturalLanguagePrompt
  );
  const handleSkip = () => {
    toggleStartScreen();
  };

  const placeholders = [
    "Find all restaurants that are no more than 200m away from a bus stop in Berlin.",
    "Give me all the public parks that have a fountain in the city of Köln.",
    "Hey! I want to know all the malls in Hamburg where I can find an ALDI supermarket.",
  ];
  const [currentText, setCurrentText] = useState<string>("");
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (direction === "forward") {
      if (currentText === placeholders[placeholderIndex]) {
        timeoutId = setTimeout(() => setDirection("backward"), 1000);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentText(
            placeholders[placeholderIndex].substring(0, currentText.length + 1)
          );
        }, 50);
      }
    } else {
      if (currentText === "") {
        timeoutId = setTimeout(() => {
          setPlaceholderIndex(
            (prevIndex) => (prevIndex + 1) % placeholders.length
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
  }, [currentText, direction, placeholderIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prevShow) => !prevShow);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  const displayedText = `${currentText}${showCursor ? "|" : ""}`;

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full">
        <Globe />
      </div>
      <div className="relative z-50 flex flex-col gap-2">
        <h1 className="pb-1 text-2xl font-bold text-center">
          Spot – Search the world with your words
        </h1>

        <Textarea
          className=" text-xl w-[32rem] shadow-lg"
          rows={4}
          placeholder={displayedText}
          onChange={(e) => setNaturalLanguagePrompt(e.target.value)}
        ></Textarea>
        <Button onClick={handleSkip}>
          <SearchIcon />
          Search
        </Button>
      </div>
    </div>
  );
};

export default StartScreen;
