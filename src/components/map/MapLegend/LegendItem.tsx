import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import React, { useRef } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { trackAction } from "@/lib/utils";
import useDisableMapInteraction from "@/stores/useDisableMapInteraction";
import useResultsStore from "@/stores/useResultsStore";

type Props = {
  set: {
    name: string;
    visible: boolean;
    id: string;
  };
  index: number;
};

const LegendItem = ({ set: { visible, name, id }, index }: Props) => {
  const toggleHighlighted = useResultsStore((state) => state.toggleHighlighted);
  const toggleVisible = useResultsStore((state) => state.toggleVisible);
  const sets = useResultsStore((state) => state.sets);
  const checkBoxRef =
    useRef<React.ElementRef<typeof CheckboxPrimitive.Root>>(null);

  useDisableMapInteraction(checkBoxRef);

  const handleToggle = (id: string) => {
    trackAction("mapLegend", "toggleSet", id);
    toggleVisible(id);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={() => handleToggle(id)}
        checked={visible}
        id={name}
        ref={checkBoxRef}
      />
      <label
        htmlFor={name}
        onMouseOver={() => toggleHighlighted(id, true)}
        onMouseOut={() => toggleHighlighted(id, false)}
        className="flex items-center justify-center gap-1 text-sm leading-none capitalize select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: sets[index].fillColor,
          }}
        />
        {name}
      </label>
    </div>
  );
};

export default LegendItem;
