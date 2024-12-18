import { useId } from "react";
import { FormScope, useField } from "@rvf/remix";
import { Group, InputBase, Checkbox as MantineCheckbox } from "@mantine/core";

export interface CheckboxGroupProps {
  label: string;
  scope: FormScope<string[]>;
  options: string[];
}

export const CheckboxGroup = ({
  scope,
  label,
  options,
}: CheckboxGroupProps) => {
  const field = useField(scope);
  const fieldValue = field.value() as string[];
  const inputId = useId();
  const errorId = useId();

  return (
    <MantineCheckbox.Group
      label={label}
      {...field.getInputProps()}
      error={field.error()}
      withAsterisk
      styles={{
        root: { marginBottom: 24, position: "relative" },
        error: { position: "absolute", bottom: -16, left: 0, paddingLeft: 0 },
      }}
    >
      <InputBase
        hidden
        {...field.getHiddenInputProps()}
        id={inputId}
        aria-describedby={errorId}
        aria-invalid={!!field.error()}
      />
      <Group mt='xs'>
        {options.map((item) => {
          return (
            <MantineCheckbox
              key={item}
              value={item}
              label={item}
              checked={fieldValue.some((el) => el === item)}
            />
          );
        })}
      </Group>
    </MantineCheckbox.Group>
  );
};
