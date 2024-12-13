import { useField } from "@rvf/remix";
import { useId } from "react";
import { TextInput } from "@mantine/core";
import "@mantine/core/styles/Input.css";

import { StringFieldProps } from "~/types/common.types";

export const TextField = ({
  label,
  scope,
  placeholder,
  ...rest
}: StringFieldProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div>
      <TextInput
        label={label}
        placeholder={placeholder}
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": errorId,
          "aria-invalid": !!field.error(),
        })}
        error={field.error()}
        size='md'
        styles={{
          wrapper: { marginBottom: 2 },
        }}
        {...rest}
      />
    </div>
  );
};
