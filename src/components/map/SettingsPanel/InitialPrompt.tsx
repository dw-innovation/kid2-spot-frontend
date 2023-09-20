import React from "react";

import { Textarea } from "@/components/ui/textarea";
import useImrStore from "@/stores/useImrStore";

const InitialPrompt = () => {
  const nlSentence = useImrStore((state) => state.nlSentence);

  return (
    <div>
      <h3 className="text-lg font-semibold ">Initial Query</h3>
      <Textarea>{nlSentence}</Textarea>
    </div>
  );
};

export default InitialPrompt;
