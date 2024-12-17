import React, { useState, useEffect } from "react";

import { DialogOpts, dialogService } from "./dialog-service";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "motion/react";
import { DialogContext } from "./dialog-context";
import { always, maybe } from "../../utils/classname-helpers";

type DialogState = {
  id: string;
  component: React.FC<any>;
  opts: DialogOpts;
  props: any;
};

export const DialogEntry: React.FC = () => {
  const [dialogStack, setDialogStack] = useState<DialogState[]>([]);

  const currentDialog = dialogStack[dialogStack.length - 1];
  const isOpen = !!currentDialog;

  const DialogComponent = currentDialog?.component;
  const props = currentDialog?.props;
  const id = currentDialog?.id;
  const opts = currentDialog?.opts;

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (nextIsOpen) => {
      if (!nextIsOpen) {
        closeDialog();
      }
    },
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const eventListener = dialogService.eventBus.on((result) => {
      const { action, data } = result;
      if (action === "dialog_open") {
        setDialogStack((prevStack) => [
          ...prevStack,
          {
            id: data.id,
            component: data.component,
            props: data.props,
            opts: data.opts,
          },
        ]);
      } else if (action === "dialog_close") {
        setDialogStack((prevStack) =>
          prevStack.filter((dialog) => dialog.id !== data.id),
        );
      } else if (action === "dialog_update") {
        setDialogStack((prevStack) =>
          prevStack.map((dialog) =>
            dialog.id === data.id
              ? { ...dialog, props: { ...dialog.props, ...data.props } }
              : dialog,
          ),
        );
      }
    });

    return () => {
      eventListener.remove();
    };
  }, []);

  function closeDialog(result?: any) {
    dialogService.close(id, result);
  }

  return (
    <DialogContext.Provider value={{ closeDialog }}>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40"
              transition={{ duration: 0.2, ease: "easeOut" }}
              key="dialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FloatingOverlay
                className="z-40 grid place-items-center bg-grey-990/50"
                lockScroll
              >
                <FloatingFocusManager context={context}>
                  <motion.div
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    initial={{ y: "-3.2rem" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-3.2rem" }}
                    className={always(
                      "relative mx-4 max-w-[calc(100vw-3.2rem)] rounded-lg bg-grey-10 shadow-lg dark:bg-grey-800",
                      maybe(opts?.size === "sm", "w-[30rem]"),
                      maybe(
                        opts?.size === "md" || opts?.size === undefined,
                        "w-[40rem]",
                      ),
                      maybe(opts?.size === "lg", "w-[56rem]"),
                    )}
                    ref={refs.setFloating}
                    aria-labelledby={headingId}
                    aria-describedby={descriptionId}
                    {...getFloatingProps()}
                  >
                    <DialogComponent
                      {...props}
                      closeDialog={(result: any) => closeDialog(result)}
                    />
                  </motion.div>
                </FloatingFocusManager>
              </FloatingOverlay>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </DialogContext.Provider>
  );
};
