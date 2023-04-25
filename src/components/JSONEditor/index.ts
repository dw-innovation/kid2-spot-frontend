import dynamic from "next/dynamic";

const DynamicJsonEditor = dynamic(() => import("./JSONEditor"), {
  ssr: false,
});

export default DynamicJsonEditor;
