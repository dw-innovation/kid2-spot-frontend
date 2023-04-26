import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";

import { FeatureCollection } from "geojson";
import React, { useEffect } from "react";
import AceEditor from "react-ace";

import useResultsStore from "@/stores/useResultsStore";

const ResultsEditor = () => {
  const [editorData, setEditorData] =
    React.useState<null | FeatureCollection>();
  const geoJSONResults = useResultsStore((state) => state.geoJSON);

  useEffect(() => {
    setEditorData(geoJSONResults);
  }, [geoJSONResults]);

  return (
    <AceEditor
      value={JSON.stringify(editorData, null, 2)}
      mode="json"
      theme="xcode"
      name="geojson-results"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
      }}
      width="100%"
      height="100%"
      readOnly
    />
  );
};

export default ResultsEditor;
