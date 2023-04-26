import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";

import React from "react";
import AceEditor from "react-ace";

import useQueryStore from "@/stores/useQueryStore";

const JSONEditor = () => {
  const jsonQuery = useQueryStore((state) => state.jsonQuery);
  const setJsonQuery = useQueryStore((state) => state.setJsonQuery);
  const onChange = (newValue: any) => {
    setJsonQuery(newValue);
  };

  return (
    <AceEditor
      value={jsonQuery}
      mode="json"
      theme="xcode"
      onChange={onChange}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
      width="100%"
      height="200px"
    />
  );
};

export default JSONEditor;
