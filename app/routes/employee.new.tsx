import { SimpleGrid } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "~/components/Button";
// import { PasswordField } from "~/components/PassswordField";
import { SingleSelectField } from "~/components/SingleSelectField";
// import { TagsField } from "~/components/TagsField/TagsField";
import { TextField } from "~/components/TextField";

import {
  IconHome,
  IconMessageExclamation,
  IconPencilMinus,
  IconTags,
  IconUsers,
} from "@tabler/icons-react";
import { MultiSelectLarge } from "~/components/MultiSelectLarge";
import { SingleSelectLarge } from "~/components/SingleSelectLarge";

export const enum NavigationLink {
  HOME = "/",
  DASHBOARD = "/dashboard",
  DASHBOARD_ALL_POSTS = "/dashboard/all-posts",
  DASHBOARD_MY_POSTS = "/dashboard/my-posts",
  DASHBOARD_USERS = "/dashboard/users",
  DASHBOARD_TAGS = "/dashboard/tags",
  DASHBOARD_COMPLAINTS = "/dashboard/complaints",
  LOGIN = "/login",
  LOGOUT = "/logout",
}

export const DashboardNavLinks = [
  {
    link: NavigationLink.DASHBOARD_ALL_POSTS,
    label: "Home",
    icon: IconHome,
  },
  {
    link: NavigationLink.DASHBOARD_MY_POSTS,
    label: "My Posts",
    icon: IconPencilMinus,
  },
  {
    link: NavigationLink.DASHBOARD_USERS,
    label: "Users",
    icon: IconUsers,
  },
  {
    link: NavigationLink.DASHBOARD_TAGS,
    label: "Tags",
    icon: IconTags,
  },
  {
    link: NavigationLink.DASHBOARD_COMPLAINTS,
    label: "Complaints",
    icon: IconMessageExclamation,
  },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log("updates >>>", updates);

  return Response.json({ success: true });
};

export const handle = { i18n: ["employee", "common"] };

export default function CreateUserPage() {
  const form = useForm({
    validator: withZod(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().min(1).email("Must be a valid email"),
        // password: z.string().min(8, "Enter at least 8 symbols").max(12),
        technology: z.string(),
        tags: z.string().trim().min(1, { message: "caugh!" }),
        cities: z.string().trim().min(1),
      })
    ),
    defaultValues: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      // password: "",
      technology: "react",
      tags: "react",
      cities: ["New York", "Texas", "California"],
    },
    method: "POST",
    handleSubmit: (data) => console.log("LOG HANDLE SUBMIT", data),
  });

  const { t } = useTranslation();

  return (
    <div>
      <nav>
        <Link
          to='#'
          // className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {/* <IconSwitchHorizontal /> */}
          <span>Change account</span>
        </Link>

        <Link
          to='#'
          // className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          {/* <IconLogout stroke={1.5} /> */}
          <span>Logout</span>
        </Link>
      </nav>

      <form {...form.getFormProps()}>
        <SimpleGrid cols={1} spacing='lg'>
          <h3>{t("greeting", { ns: "common" })}</h3>
          <h3>{t("heading", { ns: "employee" })}</h3>
          <TextField label='First name' scope={form.scope("firstName")} />
          <TextField label='Last name' scope={form.scope("lastName")} />
          <TextField label='Email' scope={form.scope("email")} />

          {/* <PasswordField label='Password' scope={form.scope("password")} /> */}

          <SingleSelectField
            label='Technologies:'
            scope={form.scope("technology")}
            options={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
            ]}
          />

          <SingleSelectLarge
            label='Tags'
            scope={form.scope("tags")}
            options={["react", "web_development", "frontend", "backend"]}
          />

          <MultiSelectLarge
            label='Cities'
            scope={form.scope("cities")}
            options={[
              "New York",
              "Texas",
              "New Virginia",
              "Washington",
              "Chicago",
              "California",
            ]}
            maxHeight={100}
          />
          {/* <TagsField
            label='Tags'
            scope={form.scope("tags")}
            options={["react", "web_development", "frontend", "backend"]}
          /> */}
          <Button
            type='submit'
            variant='filled'
            loading={form.formState.isSubmitting}
          >
            {t("buttons.submit.default", {
              ns: "common",
            })}
          </Button>
        </SimpleGrid>
      </form>
    </div>
  );
}
