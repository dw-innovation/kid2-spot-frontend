import React from "react";

import useQueryStore from "@/stores/useQueryStore";

import { Textarea } from "../ui/textarea";

const NaturalLanguageInput = () => {
  const naturalLanguagePrompt = useQueryStore(
    (state) => state.naturalLanguagePrompt
  );
  const setNaturalLanguagePrompt = useQueryStore(
    (state) => state.setNaturalLanguagePrompt
  );

  return (
    <Textarea
      value={naturalLanguagePrompt}
      onChange={({ target: { value } }) => setNaturalLanguagePrompt(value)}
      rows={4}
    />
  );
};

export default NaturalLanguageInput;
