import { useState } from "react";
import { uuid } from "short-uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAppStore from "@/stores/useAppStore";
import useImrStore from "@/stores/useImrStore";
import useMapStore from "@/stores/useMapStore";
import useQueryStore from "@/stores/useQueryStore";
import useSessionsStore from "@/stores/useSessionsStore";
import useStreetViewStore from "@/stores/useStreetViewStore";

import Dialog from "../Dialog";

const DIALOG_NAME = "saveSession";

const SaveSessionDialog = () => {
  const toggleDialog = useAppStore((state) => state.toggleDialog);
  const sessions = useSessionsStore((state) => state.sessions);
  const addSession = useSessionsStore((state) => state.addSession);

  const [sessionName, setSessionName] = useState("New Session");
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
      created: date.toDateString(),
      modified: date.toDateString(),
      id: uuid(),
      description: sessionDescription,
    });
    toggleDialog(DIALOG_NAME);
  };

  return (
    <Dialog
      dialogName={DIALOG_NAME}
      dialogTitle="Save current session"
      dialogDescription="You can save your current session in your browser to restore it at a later point in time."
    >
      <Input
        value={sessionName}
        onChange={({ target: { value } }) => setSessionName(value)}
      />
      <Textarea
        value={sessionDescription}
        onChange={({ target: { value } }) => setSessionDescription(value)}
        placeholder="Add a description"
      />
      <div className="flex gap-2">
        <Button
          onClick={() => handleSaveSession(sessionName, sessionDescription)}
        >
          Save session locally
        </Button>
      </div>
    </Dialog>
  );
};

export default SaveSessionDialog;
