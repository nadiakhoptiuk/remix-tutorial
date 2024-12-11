export type ContactType = {
  id: string;
  createdAt: string;
  avatar: string;
  first: string;
  last: string;
  twitter: string;
  favorite?: boolean;
};

export enum LocaleEnum {
  UK = "uk",
  EN = "en",
}

export interface RootLoaderData {
  contacts: ContactType[];
  q: string;
  locale: LocaleEnum;
}
