import { useId } from "react";
import { useField } from "@rvf/remix";
import { PasswordInput } from "@mantine/core";

import { StringFieldProps } from "~/types/common.types";

export const PasswordField = ({
  label,
  scope,
  placeholder,
}: StringFieldProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div>
      <PasswordInput
        label={label}
        placeholder={placeholder}
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": errorId,
          "aria-invalid": !!field.error(),
        })}
        error={field.error()}
      />
    </div>
  );
};
