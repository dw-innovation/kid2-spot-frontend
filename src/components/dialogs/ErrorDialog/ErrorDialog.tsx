import React from "react";
import ReactMarkdown from "react-markdown";

import { STRINGS } from "@/lib/const/strings/errors";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";
import ClosingButton from "./ClosingButton";
import DetectedEntitiesBar from "./DetectedEntitiesBar";
import PromptAgainButton from "./PromptAgainButton";

const DIALOG_NAME = "error";

const NumberCircle = ({ number }: { number: number }) => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium shrink-0">
    {number}
  </span>
);

const COMPONENTS = {
  p: (props: React.HTMLProps<HTMLParagraphElement>) => {
    if (
      typeof props.children === "string" &&
      props.children === "[[DETECTED_ENTITIES]]"
    ) {
      return <div className="pl-8"><DetectedEntitiesBar /></div>;
    } else if (
      typeof props.children === "string" &&
      props.children === "[[PROMPT_AGAIN_BUTTON]]"
    ) {
      return <div className="pl-8"><PromptAgainButton /></div>;
    } else {
      const children = React.Children.toArray(props.children);
      const first = children[0];
      if (typeof first === "string") {
        const match = first.match(/^\(\((\d+)\)\)\s*/);
        if (match) {
          const number = parseInt(match[1]);
          const rest = first.slice(match[0].length);
          return (
            <p className="flex items-start gap-2">
              <NumberCircle number={number} />
              <span>
                {rest}
                {children.slice(1)}
              </span>
            </p>
          );
        }
      }
      return <p {...props} />;
    }
  },
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-primary hover:text-primary/80"
    />
  ),
};

const ErrorDialog = () => {
  const errorType = useGlobalStore((state) => state.errorType);

  const errorKey = Object.keys(STRINGS).find(
    (key) => key === errorType && !key.endsWith("Title")
  );

  const dialogTitle = errorKey
    ? errorKey.endsWith("Title")
      ? STRINGS[errorKey as keyof typeof STRINGS]
      : STRINGS[`${errorKey}Title` as keyof typeof STRINGS]
    : errorType;

  const dialogDescription =
    STRINGS[errorType as keyof typeof STRINGS] || errorType;

  return (
    <Dialog dialogName={DIALOG_NAME} dialogTitle={dialogTitle}>
      <ReactMarkdown components={COMPONENTS}>{dialogDescription}</ReactMarkdown>
      <ClosingButton />
    </Dialog>
  );
};

export default ErrorDialog;
