import React from "react";

import useQueryStore from "@/stores/useQueryStore";

const NaturalLanguageInput = () => {
  const naturalLanguagePrompt = useQueryStore(
    (state) => state.naturalLanguagePrompt
  );
  const setNaturalLanguagePrompt = useQueryStore(
    (state) => state.setNaturalLanguagePrompt
  );

  return (
    <textarea
      value={naturalLanguagePrompt}
      onChange={({ target: { value } }) => setNaturalLanguagePrompt(value)}
      className="p-2"
      rows={4}
    />
  );
};

export default NaturalLanguageInput;
