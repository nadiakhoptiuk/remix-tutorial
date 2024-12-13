import { FormScope } from "@rvf/remix";
import { LocaleEnum } from "./locale.enums";
import { TextInputProps } from "@mantine/core";

export type ContactType = {
  id: string;
  createdAt: string;
  avatar: string;
  first: string;
  last: string;
  twitter: string;
  favorite?: boolean;
};

export interface RootLoaderData {
  contacts: ContactType[];
  q: string;
  locale: LocaleEnum;
}

export interface StringFieldProps extends TextInputProps {
  label: string;
  scope: FormScope<string>;
  placeholder?: string;
}

export interface SingleSelectProps<Type> {
  label: string;
  scope: FormScope<string>;
  options: Array<Type>;
}

export interface MultiSelectProps<Type> {
  label: string;
  scope: FormScope<Array<Type>>;
  options: Array<Type>;
  placeholder?: string;
}
