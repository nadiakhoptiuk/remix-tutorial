import { FormScope, ValueOfInputType } from "@rvf/remix";

export interface TextFieldProps {
  label: string;
  scope: FormScope<ValueOfInputType<string>>;
}
