import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("./ResultsEditor"), {
  ssr: false,
});

export default DynamicEditor;
