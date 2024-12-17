import {
  Box,
  Combobox,
  InputBase,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from "@mantine/core";
import { useField } from "@rvf/remix";
import { useState } from "react";

import { MultiSelectLargeProps } from "~/types/common.types";

function getFilteredOptionsWithoutActive({
  options,
  value,
  searchQuery,
  limit,
}: {
  options: string[];
  value: string[];
  searchQuery: string;
  limit: number;
}) {
  const result: string[] = [];

  for (let i = 0; i < options.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (value.includes(options[i])) {
      continue;
    }

    if (options[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(options[i]);
    }
  }

  return result;
}

export const MultiSelectLarge = <Type extends string>({
  options,
  label,
  scope,
  visibleOptions,
}: MultiSelectLargeProps<Type>) => {
  const field = useField(scope);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState<string>("");
  const value = field.value();

  const filteredOptions = getFilteredOptionsWithoutActive({
    options,
    value,
    searchQuery: search,
    limit: visibleOptions,
  });

  const handleValueRemove = (val: string) => {
    const newValue = value.filter((v) => v !== val);
    field.setValue(newValue);
  };

  const values =
    value.length > 0
      ? value.map((item) => (
          <Pill
            key={item}
            withRemoveButton
            onRemove={() => {
              handleValueRemove(item);
              field.validate();
            }}
            size='md'
          >
            {item}
          </Pill>
        ))
      : null;

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
          setSearch("");
          field.value().push(val);
          combobox.closeDropdown();
          field.validate();
        }}
      >
        <Text>{label}</Text>
        <InputBase hidden {...field.getHiddenInputProps()} />
        <Combobox.Target>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder='Search...'
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]);
                    }
                  }}
                  style={{ boxShadow: "none" }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
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
