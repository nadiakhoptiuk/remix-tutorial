import { useId } from "react";
import { FormScope, useField } from "@rvf/remix";
import { Checkbox as MantineCheckbox, CheckboxProps } from "@mantine/core";

interface CheckboxWithRVFProps extends CheckboxProps {
  scope: FormScope<boolean>;
}

export const Checkbox = ({ label, scope }: CheckboxWithRVFProps) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <MantineCheckbox
      label={label}
      {...field.getInputProps({
        type: "checkbox",
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      error={field.error()}
      styles={{
        root: { marginBottom: 24, position: "relative" },
        error: { position: "absolute", bottom: -16, left: 0, paddingLeft: 0 },
      }}
    />
  );
};
