import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

import { Alert } from "@/components/ui/alert";

type Props = {
  surface: number;
};

const SurfaceAlert = ({ surface }: Props) => (
  <>
    {surface > 250 && (
      <Alert className="my-2 bg-yellow-200 ">
        <div className="flex items-center gap-4">
          <ExclamationTriangleIcon className="block h-9 w-9" />
          <span className="block">
            The selected surface is {surface} km<sup>2</sup> wide. A surface
            this large may result in longer query times.
          </span>
        </div>
      </Alert>
    )}
  </>
);

export default SurfaceAlert;
