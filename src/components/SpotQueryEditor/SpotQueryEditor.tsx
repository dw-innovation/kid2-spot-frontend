import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import React, { useEffect } from "react";
import AceEditor from "react-ace";

import { Button } from "@/components/ui/button";
import useSpotQueryStore from "@/stores/useSpotQueryStore";

type Props = {
  setOpen: () => void;
};

const SpotQueryEditor = ({ setOpen }: Props) => {
  const spotQuery = useSpotQueryStore((state) => state.spotQuery);
  const setSpotQuery = useSpotQueryStore((state) => state.setSpotQuery);
  const stringifiedSpotQuery = useSpotQueryStore(
    (state) => state.stringifiedSpotQuery
  );
  const setStringifiedSpotQuery = useSpotQueryStore(
    (state) => state.setStringifiedSpotQuery
  );

  const onChange = (newValue: any) => {
    setStringifiedSpotQuery(newValue);
  };

  const handleSave = () => {
    try {
      const parsedValue = JSON.parse(stringifiedSpotQuery);
      setSpotQuery(parsedValue);
      setOpen();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  useEffect(() => {
    setStringifiedSpotQuery(JSON.stringify(spotQuery, null, 2));
  }, [spotQuery, setStringifiedSpotQuery]);

  return (
    <div className="flex flex-col gap-2">
      <AceEditor
        value={stringifiedSpotQuery}
        mode="json"
        theme="xcode"
        onChange={onChange}
        name="spotQuery-editor"
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

export default SpotQueryEditor;
