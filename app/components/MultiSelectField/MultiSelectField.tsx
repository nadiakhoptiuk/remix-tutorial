import { MultiSelect } from "@mantine/core";
import { useField } from "@rvf/remix";
import { useId } from "react";

import { MultiSelectProps } from "~/types/common.types";

export const MultiSelectField = <
  Type extends string | { label: string; value: string }
>({
  label,
  scope,
  options,
  placeholder,
}: MultiSelectProps<Type>) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      data={options}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      hidePickedOptions
      nothingFoundMessage='Nothing found...'
      styles={{
        input: {
          boxShadow:
            "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)",
        },
      }}
      comboboxProps={{ shadow: "md", position: "bottom" }}
      size='md'
    />
  );
};
