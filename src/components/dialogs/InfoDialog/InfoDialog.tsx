import React from "react";
import ReactMarkdown from "react-markdown";

import { STRINGS } from "@/lib/const/strings/info";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";
import PrivacyManager from "./PrivacyManager";
import TAIButton from "./TAIButton";

const DIALOG_NAME = "info";

const COMPONENTS = {
  p: (props: React.HTMLProps<HTMLParagraphElement>) => {
    if (
      typeof props.children === "string" &&
      props.children === "[[PRIVACY_MANAGER]]"
    ) {
      return <PrivacyManager />;
    } else if (
      typeof props.children === "string" &&
      props.children === "[[TAI_BUTTON]]"
    ) {
      return <TAIButton />;
    } else {
      return <p {...props} />;
    }
  },
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => {
    return <h2 {...props} className="py-2 font-bold text-md" />;
  },
  li: (props: React.HTMLProps<HTMLLIElement>) => {
    return <li {...props} className="pl-2" />;
  },
  ul: (props: React.HTMLProps<HTMLUListElement>) => {
    return <ul {...props} className="pl-4 list-disc" />;
  },
  ol: () => {
    return <ol className="pt-2 pl-6 font-bold list-decimal" />;
  },
  a: (props: React.HTMLProps<HTMLAnchorElement>) => {
    return (
      <a
        {...props}
        className="underline text-accent-foreground hover:no-underline focus:outline-none"
      />
    );
  },
};

const InfoDialog = () => {
  const dialogData =
    useGlobalStore((state) => state.dialogs).find(
      (dialog) => dialog.name === DIALOG_NAME
    )?.data || "about";

  const dialogDescription = STRINGS[`${dialogData}` as keyof typeof STRINGS];
  const dialogTitle = STRINGS[`${dialogData}Title` as keyof typeof STRINGS];

  return (
    <>
      {dialogData && (
        <Dialog dialogName={DIALOG_NAME} dialogTitle={dialogTitle} isWide>
          <div className="overflow-scroll">
            <ReactMarkdown components={COMPONENTS}>
              {dialogDescription}
            </ReactMarkdown>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default InfoDialog;
