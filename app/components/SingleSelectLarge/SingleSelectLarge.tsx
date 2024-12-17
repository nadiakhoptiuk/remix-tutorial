import { useState } from "react";
import { useField } from "@rvf/remix";
import { Box, Combobox, Text, TextInput, useCombobox } from "@mantine/core";

import { SingleSelectLargeProps } from "~/types/common.types";

function getFilteredOptions(
  data: string[],
  searchQuery: string,
  limit: number
) {
  const result: string[] = [];

  for (let i = 0; i < data.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (data[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(data[i]);
    }
  }

  return result;
}

export const SingleSelectLarge = <Type extends string>({
  options,
  label,
  scope,
  visibleOptions,
}: SingleSelectLargeProps<Type>) => {
  const field = useField(scope);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState<string>(field.value() as string | "");

  const filteredOptions = getFilteredOptions(options, search, visibleOptions);

  const selectOptions = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Box pos='relative' mb={20}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSearch(val);
          field.setValue(val);
          field.validate();
          combobox.closeDropdown();
        }}
      >
        <Text>{label}</Text>
        <TextInput hidden {...field.getHiddenInputProps()} />
        <Combobox.Target>
          <TextInput
            rightSection={<Combobox.Chevron />}
            value={search}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(field.value() || "");
              field.validate();
            }}
            placeholder='Search value'
            rightSectionPointerEvents='none'
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {selectOptions.length > 0 ? (
              selectOptions
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>

        {field.error() && (
          <Text component='span' pos='absolute' c='red' size='xs'>
            {field.error()}
          </Text>
        )}
      </Combobox>
    </Box>
  );
};
