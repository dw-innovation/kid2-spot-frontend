"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import BetaIcon from "@/assets/icons/BetaIcon";
import SpotLogo from "@/assets/icons/SpotLogo";
import SpotSelector from "@/components/SpotSelector";
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

import { useMenu } from "./Context";
import MenuItems from "./MenuItems";

const Header = () => {
  const { open, setOpen } = useMenu();
  const { commonMenu } = useStrings();

  return (
    <div className="flex gap-2">
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-end gap-5">
          <SpotLogo />
          <div className="flex flex-col w-10">
            <BetaIcon />
            <p className="text-xs">{process.env.NEXT_PUBLIC_VERSION}</p>
          </div>
          <h2 className="pb-1 text-lg font-semibold leading-none font-inter text-muted-foreground ">
            Geospatial search for OpenStreetMap
          </h2>
        </div>
        <div className="items-start hidden gap-2 md:flex">
          <SpotSelector />
          <MenuItems />
        </div>
        <div className="flex items-start gap-2 md:hidden">
          <SpotSelector />
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
