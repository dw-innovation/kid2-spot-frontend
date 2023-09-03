"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useErrorStore from "@/stores/useErrorStore";

import { Button } from "../ui/button";

const ErrorAlert = () => {
  const isError = useErrorStore((state) => state.isError);
  const setIsError = useErrorStore((state) => state.setIsError);
  const message = useErrorStore((state) => state.message);

  return (
    <>
      {isError && (
        <AlertDialog onOpenChange={(state) => setIsError(state)} open={isError}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setIsError(false)}>OK</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ErrorAlert;
