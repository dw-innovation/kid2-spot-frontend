import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";

import React, { useEffect } from "react";
import AceEditor from "react-ace";

import useResultsStore from "@/stores/useResultsStore";

const ResultsViewer = () => {
  const viewerRef = React.useRef<AceEditor>(null);
  const geoJSONResults = useResultsStore((state) => state.geoJSON);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.editor.setValue(
        JSON.stringify(geoJSONResults ? geoJSONResults : "no data", null, 2)
      );
    }
  }, [geoJSONResults]);

  return (
    <>
      <AceEditor
        ref={viewerRef}
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
    </>
  );
};

export default ResultsViewer;
