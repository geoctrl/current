import { createContext, useContext } from "react";

export const DialogContext = createContext({
  closeDialog: (result?: any) => {},
});

export const useDialogContext = () => {
  return useContext(DialogContext);
};
