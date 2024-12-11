import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
// import { useTranslation } from "react-i18next";
import { z } from "zod";

import { TextField } from "~/components/TextField";
import i18next from "~/i18next.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // const locale = await i18next.getLocale(request);
  // return Response.json({ locale });
  const t = await i18next.getFixedT(request, ["common", "employee"]);
  const greeting = t("greeting");
  const heading = t("heading");
  return Response.json({ greeting, heading });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log(updates);
};

export default function CreateUserPage() {
  // const { t } = useTranslation();
  const form = useForm({
    validator: withZod(
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().min(1).email("Must be a valid email"),
        password: z.string().min(8).max(12),
      })
    ),
    defaultValues: {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      password: "",
    },
    handleSubmit: (validatedData) => {
      console.log(validatedData);
    },
  });

  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <form {...form.getFormProps()}>
        <h3>{data.greeting}</h3>
        <h3>{data.heading}</h3>

        <TextField label='First name' scope={form.scope("firstName")} />

        <TextField label='Last name' scope={form.scope("lastName")} />

        <TextField label='Email' scope={form.scope("email")} />
        {/* <TextField
          label='Password'
          type='password'
          scope={form.scope("password")}
        /> */}

        <button type='submit'>Submit</button>
      </form>

      <form action=''></form>
    </div>
  );
}
