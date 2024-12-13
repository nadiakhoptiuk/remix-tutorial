import { SimpleGrid } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
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
      })
    ),
    defaultValues: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "",
      technology: "react",
      tags: ["react", "web_development"],
    },
    method: "POST",
  });

  const { t } = useTranslation();

  return (
    <div>
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
            label='Tags'
            scope={form.scope("tags")}
            options={[
              { value: "react", label: "react" },
              { value: "web_development", label: "web_development" },
              { value: "frontend", label: "frontend" },
              { value: "backend", label: "backend" },
            ]}
          /> */}
          <TagsField
            label='Tags'
            scope={form.scope("tags")}
            options={["react", "web_development", "frontend", "backend"]}
          />
          <Button variant='filled' loading={form.formState.isSubmitting}>
            {t("buttons.submit.default", {
              ns: "common",
            })}
          </Button>
        </SimpleGrid>
      </form>
    </div>
  );
}
