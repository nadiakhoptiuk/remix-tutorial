import { useField } from "@rvf/remix";
import { useId } from "react";
import { TextInput } from "@mantine/core";

import { TextFieldProps } from "./TextField.types";

export const TextField = ({ label, scope }: TextFieldProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <div>
      <TextInput
        label={label}
        {...field.getInputProps({
          id: inputId,
          "aria-describedby": errorId,
          "aria-invalid": !!field.error(),
        })}
      />

      {/* {type === "password" && (
          <PasswordInput
            label={label}
            {...field.getInputProps({
              id: inputId,
              "aria-describedby": errorId,
              "aria-invalid": !!field.error(),
              ref,
            })}
          />
        )} */}

      {field.error() && <p id={errorId}>{field.error()}</p>}
    </div>
  );
};
