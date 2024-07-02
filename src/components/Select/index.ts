import dynamic from "next/dynamic";

const DynamicSelect = dynamic(() => import("./Select"), {
  ssr: false,
});

export default DynamicSelect;
