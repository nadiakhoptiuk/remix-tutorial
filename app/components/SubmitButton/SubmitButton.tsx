import { Button } from "@mantine/core";
import { SubmitButtonProps } from "./SubmitButton.types";

export const SubmitButton = ({ defaultLabel, ...rest }: SubmitButtonProps) => {
  return (
    <Button type='submit' {...rest}>
      {defaultLabel}
    </Button>
  );
};
