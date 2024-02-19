import { CaretRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { animated, useSpring } from "react-spring";

import { cn } from "@/lib/utils";

import OSMQuerySubmit from "../OSMQuerySubmit";
import { Button } from "../ui/button";
import Entities from "./Entities";
import Relations from "./Relations";
import SearchArea from "./SearchArea";

const SearchRefinement = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const springProps = useSpring({
    maxHeight: isOpen ? "500px" : "0px",
    opacity: isOpen ? 1 : 0,
  });

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={"outline"}
        className="justify-start bg-slate-100"
      >
        Search Parameters
        <div
          className={cn(
            isOpen ? "rotate-90" : "",
            "transition-all duration-100 ease-in-out"
          )}
        >
          <CaretRightIcon />
        </div>
      </Button>
      <animated.div
        style={springProps}
        className="flex flex-col gap-3 cursor-auto"
      >
        <div className="flex flex-col gap-2 p-2">
          <SearchArea />
          <Entities />
          <Relations />
          <OSMQuerySubmit />
        </div>
      </animated.div>
    </>
  );
};

export default SearchRefinement;
