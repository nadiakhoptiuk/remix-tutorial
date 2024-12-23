import { SimpleGrid } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "~/components/Button";
// import { PasswordField } from "~/components/PassswordField";
import { SingleSelectField } from "~/components/SingleSelectField";
// import { TagsField } from "~/components/TagsField/TagsField";
import { TextField } from "~/components/TextField";
import { MultiSelectLarge } from "~/components/MultiSelectLarge";
import { SingleSelectLarge } from "~/components/SingleSelectLarge";
import { personRepository } from "redis/person.server";
import { EntityId } from "redis-om";

export const loader = async () => {
  const person = await personRepository
    .search()
    .where("firstName")
    .equals("Ben")
    .and("age")
    .is.greaterThanOrEqualTo(30)
    .return.first();
  console.log("loader: person >>>", person);

  return Response.json({ person });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log("updates >>>", updates);
  const existedPerson = await personRepository
    .search()
    .where("firstName")
    .equals("Ben")
    .return.first();

  if (!existedPerson) {
    const person = {
      firstName: "Ben",
      lastName: "Smith",
      age: 35,
      verified: true,
      skills: ["React", "Svelte"],
    };

    const ttlInSeconds = 60 * 1;
    const savedPerson = await personRepository.save(person);
    const personId = Reflect.get(savedPerson, EntityId);

    await personRepository.expire(personId, ttlInSeconds);
    console.log("savedPerson >>>", savedPerson);
  } else {
    console.log("existedPerson >>>", existedPerson);
  }

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
    action: "/employee/new",
    // handleSubmit: (data) => {
    //   console.log("LOG HANDLE SUBMIT", data);
    //   return true;
    // },
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
