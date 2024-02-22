import React from "react";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useSaveSession from "@/lib/hooks/useSaveSession";
import { createMailtoLink } from "@/lib/utils";

const ReportButton = () => {
  const mutation = useSaveSession({
    onSuccessCallbacks: [
      (sessionLink) => {
        const mailto = createMailtoLink({
          to: "innovation@dw.com",
          subject: "Incorrect Entities",
          body: `Please describe the entities that you think are incorrect. Your session link is: ${sessionLink}`,
        });
        const mailLink = document.createElement("a");
        mailLink.href = mailto;
        mailLink.setAttribute("target", "_blank");
        mailLink.style.display = "none";
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);
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
