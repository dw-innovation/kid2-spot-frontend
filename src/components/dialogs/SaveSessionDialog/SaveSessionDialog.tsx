import { useEffect, useState } from "react";
import { uuid } from "short-uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStrings } from "@/lib/contexts/useStrings";
import { cn } from "@/lib/utils";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "saveSession";

const SaveSessionDialog = () => {
  const {
    saveSessionDialogDescription,
    saveSessionDialogErrorNameUsed,
    saveSessionDialogPlaceholderDescription,
    saveSessionDialogPlaceholderName,
    saveSessionDialogSaveButton,
    saveSessionDialogTitle,
  } = useStrings();
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const sessions = useSessionsStore((state) => state.sessions);
  const addSession = useSessionsStore((state) => state.addSession);
  const [error, setError] = useState(false);

  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");

  const handleSaveSession = (
    sessionName: string,
    sessionDescription: string
  ) => {
    if (sessions.find((session) => session.name === sessionName)) return;

    let date = new Date();

    addSession({
      name: sessionName,
      data: {
        useAppStore: useAppStore.getState(),
        useMapStore: useMapStore.getState(),
        useQueryStore: useQueryStore.getState(),
        useStreetViewStore: useStreetViewStore.getState(),
        useImrStore: useImrStore.getState(),
      },
      created: date,
      modified: date,
      id: uuid(),
      description: sessionDescription,
    });
    setSessionName("");
    setSessionDescription("");
    toggleDialog(DIALOG_NAME);
  };

  useEffect(() => {
    if (sessions.find((session) => session.name === sessionName)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [sessionName, sessions]);

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle={saveSessionDialogTitle()}
      dialogDescription={saveSessionDialogDescription()}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-2"
      >
        <Input
          value={sessionName}
          placeholder={saveSessionDialogPlaceholderName()}
          onChange={({ target: { value } }) => setSessionName(value)}
          className={cn({ "border-red-400": error })}
        />
        {error && (
          <span className="text-sm text-red-400">
            {saveSessionDialogErrorNameUsed()}
          </span>
        )}
        <Textarea
          value={sessionDescription}
          onChange={({ target: { value } }) => setSessionDescription(value)}
          placeholder={saveSessionDialogPlaceholderDescription()}
        />
        <Button
          onClick={() => handleSaveSession(sessionName, sessionDescription)}
          disabled={error || sessionName === ""}
          type="submit"
        >
          {saveSessionDialogSaveButton()}
        </Button>
      </form>
    </Dialog>
  );
};

export default SaveSessionDialog;
