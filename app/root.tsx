import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  NavLink,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";

import { useTranslation } from "react-i18next";
import i18next from "./i18next.server";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "./theme";

import appStylesHref from "./app.css?url";
import "@mantine/core/styles.css";
import { createEmptyContact, getContacts } from "./data";

import { RootLoaderData } from "./types/common.types";
import { useEffect, useState } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { commitSession, sessionStorage } from "./services/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const locale = await i18next.getLocale(request);

  const contacts = await getContacts(q);
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  return Response.json(
    { contacts, q, locale },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

// const resolver: CSSVariablesResolver = () => ({
//   dark: {},
//   light: {},
//   variables: {
//     "--input-margin-bottom": "0",
//   },
// });

export function Layout() {
  const { contacts, q, locale } = useLoaderData<RootLoaderData>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [query, setQuery] = useState<string>(q || "");
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const { i18n } = useTranslation();
  useChangeLanguage(locale);

  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <div id='sidebar'>
            <h1>Remix Contacts</h1>

            <LanguageSelector locale={locale} />

            <div>
              <Form
                id='search-form'
                role='search'
                onChange={(event) => {
                  const isFirstSearch = q === null;

                  submit(event.currentTarget, {
                    replace: !isFirstSearch,
                  });
                }}
              >
                <input
                  id='q'
                  aria-label='Search contacts'
                  placeholder='Search'
                  type='search'
                  name='q'
                  className={searching ? "loading" : ""}
                  // defaultValue={q || ""}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  value={query}
                />
                <div id='search-spinner' aria-hidden hidden={!searching} />
              </Form>

              <Form method='post'>
                <button type='submit'>New</button>
              </Form>
            </div>

            <nav>
              {contacts.length ? (
                <ul>
                  {contacts.map((contact) => (
                    <li key={contact.id}>
                      <NavLink
                        className={({ isActive, isPending }) =>
                          isActive ? "active" : isPending ? "pending" : ""
                        }
                        to={`contacts/${contact.id}`}
                      >
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite ? <span>★</span> : null}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </nav>
          </div>

          <div
            className={
              navigation.state === "loading" && !searching ? "loading" : ""
            }
            id='detail'
          >
            <Outlet />
          </div>
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
