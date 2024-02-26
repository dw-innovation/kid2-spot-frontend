import React from "react";

import useGlobalStore from "@/stores/useGlobalStore";
import useImrStore from "@/stores/useImrStore";

import Dialog from "../Dialog";
import AddBar from "./AddBar";
import ApplyButton from "./ApplyButton";
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
      <div className="relative h-full">
        <Header name={node.display_name} />
        <div className="flex-1 max-h-full overflow-hidden">
          {filters.map((filter, index) => (
            <FilterTypeSwitch
              key={index}
              filter={filter}
              path={[index]}
              nodeId={node.id}
              pathString={`filters`}
            />
          ))}

          {filters.length === 0 && (
            <AddBar pathString={`filters`} nodeId={node.id} path={[]} />
          )}
          <ApplyButton />
        </div>
      </div>
    </Dialog>
  );
};

export default EntityEditor;
