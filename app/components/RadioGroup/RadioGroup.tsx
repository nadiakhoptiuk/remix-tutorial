import { useId } from "react";
import { FormScope, useField } from "@rvf/remix";
import { Group, Radio as MantineRadio, Radio } from "@mantine/core";

export interface RadioGroupProps {
  label: string;
  scope: FormScope<string>;
  options: string[];
}

export const RadioGroup = ({ label, scope, options }: RadioGroupProps) => {
  const field = useField(scope);
  const fieldValue: string = field.value();
  const inputId = useId();
  const errorId = useId();

  return (
    <MantineRadio.Group
      label={label}
      {...field.getInputProps()}
      id={inputId}
      aria-describedby={errorId}
      aria-invalid={!!field.error()}
      value={fieldValue}
      error={field.error()}
      withAsterisk
      styles={{ root: { width: "max-content" } }}
    >
      <Group mt='xs' styles={{ root: { width: "fit-content" } }}>
        {options.map((item) => {
          return (
            <Radio
              key={item}
              value={item}
              label={item}
              checked={fieldValue === item}
              styles={{
                radio: { width: "100%" },
                root: { width: "max-content" },
              }}
              size='xs'
            />
          );
        })}
      </Group>
    </MantineRadio.Group>
  );
};
