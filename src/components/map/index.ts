import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./MapContainer"), {
  ssr: false,
});

export default DynamicMap;
