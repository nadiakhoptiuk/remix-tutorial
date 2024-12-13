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
      size='md'
      styles={{
        input: {
          boxShadow:
            "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)",
        },
      }}
    />
  );
};
