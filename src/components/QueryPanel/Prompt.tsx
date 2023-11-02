import { SearchIcon } from "lucide-react";
import React, { KeyboardEvent } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

const Prompt = () => {
  const nlSentence = useImrStore((state) => state.nlSentence);
  const setNlSentence = useImrStore((state) => state.setNlSentence);
  const resetSteps = useGlobalStore((state) => state.resetSteps);
  const nextStep = useGlobalStore((state) => state.nextStep);

  const toggleDialog = useGlobalStore((state) => state.toggleDialog);

  const handleSearchTrigger = () => {
    if (nlSentence !== "") {
      resetSteps();
      nextStep();
      toggleDialog("inputStepper");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchTrigger();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Your search</h3>
      <form className="flex flex-col gap-2">
        <Textarea
          onChange={({ target: { value } }) => setNlSentence(value)}
          value={nlSentence}
          onKeyDown={handleKeyPress}
        />
        <Button onClick={handleSearchTrigger} type="button">
          <SearchIcon className="w-4 h-4" />
          Search
        </Button>
      </form>
    </div>
  );
};

export default Prompt;
