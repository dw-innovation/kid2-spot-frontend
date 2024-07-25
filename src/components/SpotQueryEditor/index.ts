import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("./SpotQueryEditor"), {
  ssr: false,
});

export default DynamicEditor;
