import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import useImrStore from "@/stores/useImrStore";
import { Edge } from "@/types/imr";

import ContainsRelation from "./ContainsRelation";
import DistanceRelaton from "./DistanceRelation";

const Relations = () => {
  const imr = useImrStore((state) => state.imr);
  const addDistanceRelation = useImrStore((state) => state.addDistanceRelation);
  const addContainsRelation = useImrStore((state) => state.addContainsRelation);

  return (
    <fieldset className="flex flex-col gap-4 border-[1px] p-2">
      <legend className="flex gap-2 px-2 font-bold">
        Relations
        <Button
          variant={"outline"}
          className="h-8 p-1"
          onClick={() => addDistanceRelation()}
        >
          <PlusIcon /> add distance relation
        </Button>
        <Button
          variant={"outline"}
          className="h-8 p-1"
          onClick={() => addContainsRelation()}
        >
          <PlusIcon /> add contains relation
        </Button>
      </legend>
      {imr &&
        imr.es &&
        imr.es.map((edge: Edge) => (
          <div key={`${edge.id}${edge.t}`} className="flex justify-between">
            {edge.t === "cnt" && <ContainsRelation edge={edge} />}
            {edge.t === "dist" && <DistanceRelaton edge={edge} />}
          </div>
        ))}
    </fieldset>
  );
};

export default Relations;
