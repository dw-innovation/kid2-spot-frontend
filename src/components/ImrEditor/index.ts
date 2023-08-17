import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("./ImrEditor"), {
  ssr: false,
});

export default DynamicEditor;
