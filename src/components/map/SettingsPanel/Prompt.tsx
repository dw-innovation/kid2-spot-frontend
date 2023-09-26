import React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useImrStore from "@/stores/useImrStore";

const Prompt = () => {
  const nlSentence = useImrStore((state) => state.nlSentence);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold ">Initial Query</h3>
      <Textarea>{nlSentence}</Textarea>
      <Button>
        <span>Search</span>
      </Button>
    </div>
  );
};

export default Prompt;
