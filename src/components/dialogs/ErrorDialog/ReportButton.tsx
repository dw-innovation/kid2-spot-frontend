import React from "react";
import { toast } from "react-toastify";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useSaveSession from "@/lib/hooks/useSaveSession";

const ReportButton = () => {
  const mutation = useSaveSession({
    onSuccessCallbacks: [
      (sessionLink) => {
        window.navigator.clipboard.writeText(sessionLink);
        toast.success("Session saved and share link copied to clipboard!");
      },
    ],
  });

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await mutation.mutateAsync();
  };

  return (
    <Button variant={"secondary"} className="w-fit" onClick={handleClick}>
      {mutation.isLoading && <LoadingSpinner />} Report Incorrect Entities
    </Button>
  );
};

export default ReportButton;
