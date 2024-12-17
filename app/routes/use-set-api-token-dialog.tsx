import { useDialog } from "../hooks/use-dialog";
import { DialogHeader } from "../common/dialog/dialog-header";
import { DialogBody } from "../common/dialog/dialog-body";
import { DialogFooter } from "../common/dialog/dialog-footer";
import { Button, Input } from "../common";
import { useState } from "react";
import { Label } from "../common/label/label";
import { API_TOKEN, updateApiToken } from "./api-token";
import { useDialogContext } from "../common/dialog/dialog-context";

export function useSetApiTokenDialog() {
  return useDialog(() => {
    const [token, setToken] = useState(API_TOKEN);
    const { closeDialog } = useDialogContext();
    return (
      <>
        <DialogHeader title={"Set API Token"} />
        <DialogBody>
          <Label>TOKEN</Label>
          <Input value={token} onChange={setToken} />
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => closeDialog(false)}>Cancel</Button>
          <Button
            intent="primary"
            onClick={() => {
              updateApiToken(token);
              closeDialog(true);
            }}
            disabled={!token}
          >
            Save
          </Button>
        </DialogFooter>
      </>
    );
  });
}
