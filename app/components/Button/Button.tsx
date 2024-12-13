import { Button } from "@mantine/core";

import { BaseButtonProps } from "./BaseButton.types";

export const BaseButton = ({ children, ...rest }: BaseButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};
