import React, { isValidElement, ReactNode } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useListNavigation,
  useHover,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  autoUpdate,
  safePolygon,
  FloatingPortal,
  useFloatingTree,
  useFloatingNodeId,
  useMergeRefs,
  useFloatingParentNodeId,
  FloatingNode,
  FloatingFocusManager,
  useTransitionStyles,
} from "@floating-ui/react";
import { always } from "../../utils/classname-helpers";

export type MenuProps = {
  children?: ReactNode;
  nested?: boolean;
  placementSide?: "start" | "end";
  renderItem?: (props: any) => ReactNode;
  renderTrigger?: (refProps: any, controlProps: any) => ReactNode;
};
export const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
  (
    { children, renderItem, placementSide = "start", renderTrigger, ...props },
    forwardedRef,
  ) => {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [allowHover, setAllowHover] = React.useState(false);

    const listItemsRef = React.useRef<
      Array<HTMLButtonElement | HTMLAnchorElement | null>
    >([]);
    const listContentRef = React.useRef(
      React.Children.map(children, (child) =>
        React.isValidElement(child) ? child.props.label : null,
      ) as Array<string | null>,
    );

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;

    const { x, y, strategy, refs, context } = useFloating<HTMLButtonElement>({
      open,
      nodeId,
      onOpenChange: setOpen,
      placement: nested ? `right-${placementSide}` : `bottom-${placementSide}`,
      middleware: [
        offset({ mainAxis: 4, alignmentAxis: nested ? -8 : 0 }),
        flip(),
        shift(),
      ],
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useHover(context, {
          handleClose: safePolygon(),
          enabled: nested && allowHover,
          delay: { open: 75 },
        }),
        useClick(context, {
          toggle: !nested || !allowHover,
          event: "mousedown",
          ignoreMouse: nested,
        }),
        useRole(context, { role: "menu" }),
        useDismiss(context),
        useListNavigation(context, {
          listRef: listItemsRef,
          activeIndex,
          nested,
          onNavigate: setActiveIndex,
        }),
        useTypeahead(context, {
          listRef: listContentRef,
          onMatch: open ? setActiveIndex : undefined,
          activeIndex,
        }),
      ]);

    const { isMounted, styles: transitionStyles } = useTransitionStyles(
      context,
      {
        initial: () => {
          return {
            opacity: 0,
          };
        },
        open: () => {
          return {
            opacity: 1,
          };
        },
        close: {
          opacity: 0,
        },
      },
    );

    React.useEffect(() => {
      function handleTreeClick() {
        setOpen(false);
      }

      tree?.events.on("click", handleTreeClick);
      return () => {
        tree?.events.off("click", handleTreeClick);
      };
    }, [tree]);

    React.useEffect(() => {
      function onPointerMove({ pointerType }: PointerEvent) {
        if (pointerType === "mouse") {
          setAllowHover(true);
        }
      }

      function onKeyDown() {
        setAllowHover(false);
      }

      window.addEventListener("pointermove", onPointerMove, {
        once: true,
        capture: true,
      });
      window.addEventListener("keydown", onKeyDown, true);
      return () => {
        window.removeEventListener("pointermove", onPointerMove, {
          capture: true,
        });
        window.removeEventListener("keydown", onKeyDown, true);
      };
    }, [allowHover]);

    const referenceRef = useMergeRefs([refs.setReference, forwardedRef]);

    return (
      <FloatingNode id={nodeId}>
        {renderTrigger?.(
          getReferenceProps({
            ref: referenceRef,
            ...props,
            onClick(event) {
              event.stopPropagation();
            },
          }),
          { isOpen: open },
        ) ||
          renderItem?.({
            ref: referenceRef,
            isSubMenu: true,
            ...getReferenceProps({
              ...props,
              className: "cp-floating-menu-item",
              role: "menuitem",
              onClick(event) {
                event.stopPropagation();
              },
            }),
          })}
        <FloatingPortal>
          {isMounted && (
            <FloatingFocusManager
              context={context}
              modal={!nested}
              initialFocus={nested ? -1 : 0}
              returnFocus={!nested}
              visuallyHiddenDismiss
            >
              <div
                ref={refs.setFloating}
                className={always(
                  "z-40 flex flex-col overflow-hidden rounded-lg border border-grey-300 bg-grey-10 py-2 shadow-lg outline-none",
                  "dark:border-grey-700 dark:bg-grey-900",
                )}
                style={{
                  ...transitionStyles,
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: "max-content",
                }}
                {...getFloatingProps({
                  onKeyDown(event) {
                    if (event.key === "Tab") {
                      setOpen(false);
                    }
                  },
                })}
              >
                {React.Children.map(
                  children as any,
                  (
                    child: ReactNode & {
                      type: { displayName: string | undefined };
                    },
                    index,
                  ) => {
                    if (!isValidElement(child)) return null;
                    if (
                      child.type?.displayName !== "MenuItem" &&
                      child.type?.displayName !== "MenuItemLink"
                    )
                      return child;
                    return React.cloneElement(
                      child,
                      getItemProps({
                        tabIndex: activeIndex === index ? 0 : -1,
                        role: "menuitem",
                        className: "MenuItem",
                        ref(node: HTMLButtonElement) {
                          listItemsRef.current[index] = node;
                        },
                        onClick(event) {
                          child.props.onClick?.(event);
                          tree?.events.emit("click");
                        },
                        onPointerEnter() {
                          if (allowHover) {
                            setActiveIndex(index);
                          }
                        },
                      }),
                    );
                  },
                )}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      </FloatingNode>
    );
  },
);
