import { useId } from "react";
import { FormScope, useField } from "@rvf/remix";
import { InputBase } from "@mantine/core";
import { DatesProvider, DateTimePicker as Picker } from "@mantine/dates";

import "dayjs/locale/uk";
import "@mantine/dates/styles.css";

export const DateTimePicker = ({
  scope,
  label,
}: {
  scope: FormScope<string>;
  label: string;
}) => {
  const field = useField(scope);
  const inputId = useId();
  const errorId = useId();

  const currentDate = field.value() ? new Date(field.value()) : null;

  return (
    <>
      <DatesProvider
        settings={{
          locale: "uk",
        }}
      >
        <Picker
          label={label}
          dropdownType='popover'
          placeholder='Pick a Date'
          value={currentDate}
          onChange={(val) => {
            if (val) {
              field.setValue(val.toISOString());
            }
          }}
        />
        <InputBase
          hidden
          {...field.getHiddenInputProps()}
          id={inputId}
          aria-describedby={errorId}
          aria-invalid={!!field.error()}
        />
      </DatesProvider>
    </>
  );
};
