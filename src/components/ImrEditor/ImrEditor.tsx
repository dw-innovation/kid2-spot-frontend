import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import React, { useEffect } from "react";
import AceEditor from "react-ace";

import useImrStore from "@/stores/useImrStore";

const ImrEditor = () => {
  const imr = useImrStore((state) => state.imr);
  const setImr = useImrStore((state) => state.setImr);
  const stringifiedImr = useImrStore((state) => state.stringifiedImr);
  const setStringifiedImr = useImrStore((state) => state.setStringifiedImr);

  const onChange = (newValue: any) => {
    setStringifiedImr(newValue);
  };

  const handleBlur = () => {
    try {
      const parsedValue = JSON.parse(stringifiedImr);
      setImr(parsedValue);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  useEffect(() => {
    setStringifiedImr(JSON.stringify(imr, null, 2));
  }, [imr]);

  return (
    <AceEditor
      value={stringifiedImr}
      mode="json"
      theme="xcode"
      onChange={onChange}
      onBlur={handleBlur}
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
