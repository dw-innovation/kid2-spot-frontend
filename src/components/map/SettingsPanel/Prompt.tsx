import { SearchIcon } from "lucide-react";
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
        <SearchIcon className="w-4 h-4" />
        Search
      </Button>
    </div>
  );
};

export default Prompt;
