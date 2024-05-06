import { SearchIcon } from "lucide-react";
import React, { KeyboardEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, trackAction } from "@/lib/utils";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

const PromptInput = () => {
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setNlSentence = useImrStore((state) => state.setNlSentence);
  const resetSteps = useGlobalStore((state) => state.resetSteps);
  const nextStep = useGlobalStore((state) => state.nextStep);
  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  const [inputValue, setInputValue] = useState(nlSentence);

  useEffect(() => {
    setInputValue(nlSentence);
  }, [nlSentence]);

  const handleSearchTrigger = () => {
    if (inputValue !== "") {
      resetSteps();
      nextStep();
      toggleDialog("inputStepper");
      trackAction("promptInput", "search", inputValue);
      setNlSentence(inputValue);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchTrigger();
    }
  };

  const isDisabled = inputValue === nlSentence || inputValue === "";

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Your search</h3>
      <form className="flex flex-col gap-2">
        <Textarea
          onChange={({ target: { value } }) => setInputValue(value)}
          value={inputValue}
          onKeyDown={handleKeyPress}
        />
        <Button
          onClick={handleSearchTrigger}
          type="button"
          disabled={isDisabled}
          className={cn(
            isDisabled
              ? "cursor-not-allowed bg-gray-200 hover:bg-gray-200"
              : "cursor-pointer"
          )}
        >
          <SearchIcon className="w-4 h-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default PromptInput;
