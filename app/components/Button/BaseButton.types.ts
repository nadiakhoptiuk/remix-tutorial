import { ButtonProps } from "@mantine/core";
import { ReactNode } from "react";

export interface BaseButtonProps extends ButtonProps {
  children: ReactNode;
}
