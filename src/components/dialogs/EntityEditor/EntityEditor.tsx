import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import Dialog from "../Dialog";
import FilterTypeSwitch from "./FilterTypeSwitch";
import Header from "./Header";

const DIALOG_NAME = "entityEditor";

const EntityEditor = () => {
  const dialogs = useGlobalStore((state) => state.dialogs);

  const dialogData = dialogs.find(
    (dialog) => dialog.name === DIALOG_NAME
  )?.data;

  const node = useImrStore((state) => state.imr.nodes[dialogData?.id || 0]);
  const filters = node.filters;

  return (
    <Dialog dialogName={DIALOG_NAME} className="sm:max-w-[40rem] w-fit">
      <Header name={node.name} />

      <pre className="text-xs">{JSON.stringify(filters, null, 2)}</pre>

      {filters.map((filter, index) => (
        <FilterTypeSwitch
          key={index}
          filter={filter}
          path={[index]}
          nodeId={node.id}
          pathString={`filters`}
        />
      ))}
    </Dialog>
  );
};

export default EntityEditor;
