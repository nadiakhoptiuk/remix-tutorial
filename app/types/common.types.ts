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
}
