"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useStrings from "@/lib/contexts/useStrings";

import Spots from "../Spots";
import { useMenu } from "./Context";
import MenuItems from "./MenuItems";

const Header = () => {
  const { open, setOpen } = useMenu();
  const { commonMenu } = useStrings();

  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-between flex-1">
        <h1 className="pb-1 text-2xl font-bold leading-none">Spot</h1>
        <div className="items-start hidden gap-2 md:flex">
          <Spots />
          <MenuItems />
        </div>
        <div className="flex items-start gap-2 md:hidden">
          <Spots />
          <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
            <SheetTrigger className="block md:hidden" asChild>
              <Button onClick={() => setOpen((prev) => !prev)}>
                <HamburgerMenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="md:hidden">
              <SheetHeader>
                <SheetTitle>{commonMenu()}</SheetTitle>
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
