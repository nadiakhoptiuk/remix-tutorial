import { useId } from "react";
import { useField } from "@rvf/remix";
import { NativeSelect } from "@mantine/core";

import { SingleSelectProps } from "~/types/common.types";

export const SingleSelectField = <
  Type extends string | { label: string; value: string }
>({
  label,
  scope,
  options,
}: SingleSelectProps<Type>) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  return (
    <NativeSelect
      label={label}
      data={options}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
    />
  );
};
