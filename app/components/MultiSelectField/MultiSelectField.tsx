import { MultiSelect } from "@mantine/core";
import { useField } from "@rvf/remix";
import { useId } from "react";

import { MultiSelectProps } from "~/types/common.types";
import "@mantine/core/styles/global.css";

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

  // console.log(field.value());

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
      searchable
      hidePickedOptions
      nothingFoundMessage='Nothing found...'
      withAsterisk={false}
    />
  );
};
