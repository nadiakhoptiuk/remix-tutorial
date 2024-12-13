import { useId } from "react";
import { useField } from "@rvf/remix";
import { ComboboxItem, OptionsFilter, TagsInput } from "@mantine/core";

import { MultiSelectProps } from "~/types/common.types";

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(" ");
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(" ");
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord))
    );
  });
};

export const TagsField = <
  Type extends string | { label: string; value: string }
>({
  label,
  scope,
  placeholder,
  options,
}: MultiSelectProps<Type>) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  console.log(field);

  return (
    <TagsInput
      label={label}
      placeholder={placeholder}
      data={options}
      filter={optionsFilter}
      {...field.getInputProps({
        id: inputId,
        "aria-describedby": errorId,
        "aria-invalid": !!field.error(),
      })}
      error={field.error()}
      maxDropdownHeight={200}
      acceptValueOnBlur
      styles={{
        input: {
          boxShadow:
            "0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2)",
        },
        inputField: { boxShadow: "none" },
      }}
      size='md'
    />
  );
};
