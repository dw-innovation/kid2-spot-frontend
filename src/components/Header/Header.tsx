"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import OSMQuerySubmit from "../OSMQuerySubmit";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useMenu } from "./Context";
import MenuItems from "./MenuItems";

const Header = () => {
  const { open, setOpen } = useMenu();

  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-between flex-1">
        <h1 className="pb-1 text-2xl font-bold leading-none">Spot</h1>
        <div className="hidden gap-2 md:flex">
          <OSMQuerySubmit />
          <MenuItems />
        </div>
        <div className="flex gap-2 md:hidden">
          <OSMQuerySubmit />
          <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
            <SheetTrigger className="block md:hidden">
              <Button onClick={() => setOpen((prev) => !prev)}>
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="md:hidden">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <MenuItems />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
