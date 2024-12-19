import { useId } from "react";
import { useField } from "@rvf/remix";
import { Textarea as MantineTextarea } from "@mantine/core";

import { StringFieldProps } from "~/types/common.types";

export const Textarea = ({ label, scope, placeholder }: StringFieldProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <MantineTextarea
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      error={field.error()}
      label={label}
      placeholder={placeholder}
      styles={{
        error: { position: "absolute" },
        root: { position: "relative" },
      }}
    />
  );
};
