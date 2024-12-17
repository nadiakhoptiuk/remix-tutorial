import { SimpleGrid } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "~/components/Button";
// import { MultiSelectField } from "~/components/MultiSelectField";
import { PasswordField } from "~/components/PassswordField";
import { SingleSelectField } from "~/components/SingleSelectField";
import { TagsField } from "~/components/TagsField/TagsField";
// import { TagsField } from "~/components/TagsField/TagsField";
import { TextField } from "~/components/TextField";

import {
  IconHome,
  IconMessageExclamation,
  IconPencilMinus,
  IconTags,
  IconUsers,
} from "@tabler/icons-react";
// import { MultiSelectField } from "~/components/MultiSelectField";

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

// import citiesData from "~/constants/citiesData.json";

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
        password: z.string().min(8, "Enter at least 8 symbols").max(12),
        technology: z.string(),
        tags: z
          .string()
          .trim()
          .regex(new RegExp(/^[a-zA-Z_,]+$/), {
            message: "Must contains of: a-z, A-Z or _",
          }),
        // cities: z
        //   .string()
        //   .trim()
        //   .regex(new RegExp(/^[a-zA-Z ,]+$/), {
        //     message: "Must contains of: a-z, A-Z or space",
        //   }),
      })
    ),
    defaultValues: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "",
      technology: "react",
      tags: ["react", "web_development"],
      // cities: ["West Alexzander", "Champaign"],
    },
    method: "POST",
  });

  const { t } = useTranslation();

  // console.log("citiesData", citiesData.length);

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
          <PasswordField label='Password' scope={form.scope("password")} />
          <SingleSelectField
            label='Technologies:'
            scope={form.scope("technology")}
            options={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
            ]}
          />
          {/* <MultiSelectField
            label='Cities'
            scope={form.scope("cities")}
            options={citiesData.map(({ label }) => label)}
          /> */}
          <TagsField
            label='Tags'
            scope={form.scope("tags")}
            options={["react", "web_development", "frontend", "backend"]}
          />
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
