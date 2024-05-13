import React from "react";
import ReactMarkdown from "react-markdown";

import { STRINGS } from "@/lib/const/strings/errors";
import useGlobalStore from "@/stores/useGlobalStore";

import Dialog from "../Dialog";
import ClosingButton from "./ClosingButton";
import DetectedEntitiesBar from "./DetectedEntitiesBar";
import ReportButton from "./ReportButton";
import SignIn from "@/components/Header/AuthNav/SignIn";

const DIALOG_NAME = "error";

const COMPONENTS = {
  p: (props: React.HTMLProps<HTMLParagraphElement>) => {
    if (
      typeof props.children === "string" &&
      props.children === "[[DETECTED_ENTITIES]]"
    ) {
      return <DetectedEntitiesBar />;
    } else if (
      typeof props.children === "string" &&
      props.children === "[[REPORT_BUTTON]]"
    ) {
      return <ReportButton />;
    } else if (
      typeof props.children === "string" &&
      props.children === "[[LOGIN_BUTTON]]"
    ) {
      return <SignIn />;
    } else {
      return <p {...props} />;
    }
  },
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
