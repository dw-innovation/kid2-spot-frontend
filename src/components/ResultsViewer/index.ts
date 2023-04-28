import dynamic from "next/dynamic";

const DynamicResultsViewer = dynamic(() => import("./ResultsViewer"), {
  ssr: false,
});

export default DynamicResultsViewer;
