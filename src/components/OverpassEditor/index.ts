import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("./OverpassEditor"), {
  ssr: false,
});

export default DynamicEditor;
