import { useState } from "react";
import { useField } from "@rvf/remix";
import { Box, Combobox, InputBase, Text, useCombobox } from "@mantine/core";

import { SingleSelectLargeProps } from "~/types/common.types";

function getFilteredOptions({
  options,
  searchQuery,
  limit = "all",
}: {
  options: string[];
  searchQuery: string;
  limit?: number | "all";
}) {
  const result: string[] = [];

  if (limit === "all" && searchQuery === "") {
    return options;
  }

  for (let i = 0; i < options.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (options[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(options[i]);
    }
  }

  return result;
}

export const SingleSelectLarge = <Type extends string>({
  options,
  label,
  scope,
  visibleOptionsLimit = "all",
  creatable = true,
}: SingleSelectLargeProps<Type>) => {
  const field = useField(scope);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [search, setSearch] = useState<string>(field.value() as string | "");
  const [data, setData] = useState<string[]>(options);

  const filteredOptions = getFilteredOptions({
    options: data,
    searchQuery: search,
    limit: visibleOptionsLimit,
  });

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
          if (val === "$create") {
            field.setValue(search);
            field.validate();
            setData((current) => [...current, search]);
            combobox.closeDropdown();
          } else {
            setSearch(val);
            field.setValue(val);
            field.validate();
            combobox.closeDropdown();
          }
        }}
      >
        <Text>{label}</Text>
        <InputBase hidden {...field.getHiddenInputProps()} />
        <Combobox.Target>
          <InputBase
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
              <>
                <Combobox.Empty style={{ textAlign: "left" }}>
                  Nothing found
                </Combobox.Empty>
                {creatable && (
                  <Combobox.Option value='$create'>
                    + Create {search}
                  </Combobox.Option>
                )}
              </>
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
