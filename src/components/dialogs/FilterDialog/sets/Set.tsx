import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useImrStore from "@/stores/useImrStore";
import { Cluster, Filter, NWR } from "@/types/imr";

import ClusterFilter from "./ClusterFilter";
import NWRFilter from "./NWRFilter";

const Set = ({ node }: { node: NWR | Cluster }) => {
  const addFilter = useImrStore((state) => state.addFilter);
  const removeFilter = useImrStore((state) => state.removeFilter);
  const setSetName = useImrStore((state) => state.setSetName);
  const removeNode = useImrStore((state) => state.removeNode);
  const setClusterProp = useImrStore((state) => state.setClusterProp);

  const { id, n, t, flts } = node;

  useEffect(() => {
    if (flts.length > 0) setSetName(id, `${flts[0].k}_${flts[0].v}`);
  }, [flts, id, setSetName]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="font-bold">
            Set {id}: {n}
          </span>
          <Badge className="h-6">{t === "nwr" ? "NWR" : "Cluster"}</Badge>
          <Button
            onClick={() => removeNode(id)}
            variant="ghost"
            className="h-8 p-1"
          >
            <TrashIcon scale={3} />
          </Button>
        </div>
        <div className="flex gap-2 ">
          <Button
            variant="outline"
            className="h-8 p-1"
            onClick={() => addFilter(id)}
          >
            <PlusIcon /> add filter
          </Button>
        </div>
      </div>
      <section className="flex flex-col gap-1 ml-8 font-normal">
        {t === "nwr" && (
          <ol className="list-decimal">
            {flts.map((filter: Filter, index: number) => (
              <li key={index} className="w-full">
                <div className="flex justify-between gap-2">
                  <NWRFilter filter={filter} filterId={index} setId={id} />
                  <Button
                    variant="ghost"
                    className="p-1 aspect-square"
                    onClick={() => removeFilter(id, index)}
                  >
                    <TrashIcon scale={3} />
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        )}
        {t === "cluster" && (
          <>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Label>Minimum Points</Label>
                <Input
                  value={node.minPts}
                  onChange={({ target: { value } }) =>
                    value !== "" &&
                    setClusterProp(id, "minPts", parseInt(value))
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Label>Max Distance</Label>
                <Input
                  value={node.maxDist}
                  onChange={({ target: { value } }) =>
                    value !== "" && setClusterProp(id, "maxDist", value)
                  }
                />
              </div>
            </div>
            <ol className="list-decimal">
              {flts.map((filter: Filter, index: number) => (
                <li key={index} className="w-full">
                  <div className="flex justify-between gap-2">
                    <ClusterFilter
                      filter={filter}
                      filterId={index}
                      setId={id}
                    />
                    <Button
                      variant="ghost"
                      className="p-1 aspect-square"
                      onClick={() => removeFilter(id, index)}
                    >
                      <TrashIcon scale={3} />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </section>
    </div>
  );
};

export default Set;
