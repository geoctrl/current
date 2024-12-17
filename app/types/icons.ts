import { IconProps } from "../common";
import { ReactNode } from "react";
import { IconGen } from "./icon-gen";

export type Icons = IconGen;
export type IconOrElement = Icons | IconProps | ReactNode;
