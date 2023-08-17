import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import React from "react";
import AceEditor from "react-ace";

import useQueryStore from "@/stores/useQueryStore";

const ImrEditor = () => {
  const imr = useQueryStore((state) => state.imr);
  const setImr = useQueryStore((state) => state.setImr);
  const onChange = (newValue: any) => {
    setImr(newValue);
  };

  return (
    <AceEditor
      value={imr}
      mode="json"
      theme="xcode"
      onChange={onChange}
      name="imr-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
      width="100%"
      height="100%"
    />
  );
};

export default ImrEditor;
