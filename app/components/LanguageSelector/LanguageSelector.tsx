import { useFetcher } from "@remix-run/react";

import { NativeSelect } from "@mantine/core";

import { LANGUAGE_SELECTOR_OPTIONS } from "~/constants/constants";
import { LocaleEnum } from "~/types/locale.enums";

export const LanguageSelector = ({ locale }: { locale: LocaleEnum }) => {
  const fetcher = useFetcher();

  return (
    <NativeSelect
      onChange={(e) =>
        fetcher.submit(
          { locale: e.target.value },
          { method: "POST", action: "/handleLanguageChange" }
        )
      }
      data={LANGUAGE_SELECTOR_OPTIONS}
      defaultValue={locale}
    />
  );
};
