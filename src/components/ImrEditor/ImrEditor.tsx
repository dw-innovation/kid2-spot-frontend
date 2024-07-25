import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import React, { useEffect } from "react";
import AceEditor from "react-ace";

import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";

type Props = {
  setOpen: () => void;
};

const ImrEditor = ({ setOpen }: Props) => {
  const imr = useImrStore((state) => state.imr);
  const setImr = useImrStore((state) => state.setImr);
  const stringifiedImr = useImrStore((state) => state.stringifiedImr);
  const setStringifiedImr = useImrStore((state) => state.setStringifiedImr);

  const onChange = (newValue: any) => {
    setStringifiedImr(newValue);
  };

  const handleSave = () => {
    try {
      const parsedValue = JSON.parse(stringifiedImr);
      setImr(parsedValue);
      setOpen();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  useEffect(() => {
    setStringifiedImr(JSON.stringify(imr, null, 2));
  }, [imr, setStringifiedImr]);

  return (
    <div className="flex flex-col gap-2">
      <AceEditor
        value={stringifiedImr}
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
        className="min-h-[32rem]"
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ImrEditor;
