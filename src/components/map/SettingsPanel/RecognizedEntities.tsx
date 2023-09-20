import React from "react";

import useImrStore from "@/stores/useImrStore";

const RecognizedEntities = () => {
  const nodes = useImrStore((state) => state.imr.ns);

  return (
    <div>
      <h3 className="text-lg font-semibold ">Recognized Entities</h3>
      <div className="ml-4">
        <ol className="ml-4 list-decimal">
          {nodes &&
            nodes.map((node, index) => (
              <li key={index} className="capitalize">
                {node.n}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default RecognizedEntities;
