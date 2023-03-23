import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

import React from "react";
import AceEditor from "react-ace";

import useQueryStore from "@/stores/useQueryStore";

const OverpassEditor = () => {
  const overpassQuery = useQueryStore((state) => state.overpassQuery);
  const setOverpassQuery = useQueryStore((state) => state.setOverpassQuery);
  const onChange = (newValue: any) => {
    setOverpassQuery(newValue);
  };

  return (
    <AceEditor
      value={overpassQuery}
      mode="java"
      theme="github"
      onChange={onChange}
      name="overpass-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
      width="100%"
      height="300px"
    />
  );
};

export default OverpassEditor;
