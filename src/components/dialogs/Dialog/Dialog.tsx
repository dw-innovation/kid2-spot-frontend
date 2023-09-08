import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";

type Props = {
  dialogName: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children: React.ReactNode;
  className?: string;
};

const DownloadDialog = ({
  dialogName,
  dialogTitle,
  dialogDescription,
  children,
  className,
}: Props) => {
  const dialogs = useAppStore((state) => state.dialogs);
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let dialogState =
      dialogs.find((dialog) => dialog.name === dialogName)?.isOpen || false;
    setIsOpen(dialogState);
  }, [dialogName, dialogs]);

  return (
    <Dialog open={isOpen} onOpenChange={() => toggleDialog(dialogName)}>
      <DialogContent className={cn("sm:max-w-[425px] z-[20000]", className)}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogDescription && (
            <DialogDescription>{dialogDescription}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
