// import { Paper } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Group } from "@mantine/core";
import { Button } from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { MultiSelectLarge } from "~/components/MultiSelectLarge";
// import { Post } from "~/components/Post";
import { Editor } from "~/components/RichTextEditor/RichTextEditor";
import { SingleSelectLarge } from "~/components/SingleSelectLarge";
import { CheckboxGroup } from "~/components/CheckboxGroup";
import { Textarea } from "~/components/Textarea";
import { RadioGroup } from "~/components/RadioGroup";

import citiesData from "~/constants/citiesData.json";
import { DateTimePicker } from "~/components/DateTimePicker";
import redisClient from "redis/config.server";
// import { personRepository } from "redis/person.server";

export const loader = async () => {
  // const person = {
  //   firstName: "Ben",
  //   lastName: "Smith",
  //   age: 35,
  //   verified: true,
  //   skills: ["React", "Svelte"],
  // };

  // await personRepository.save(person);

  const cacheKey = "cityLabels";
  let cities = [];

  const citiesCache = await redisClient.get(cacheKey);

  if (citiesCache) {
    cities = JSON.parse(citiesCache);
    console.log("parsing cache: >>>", cities.length);
  } else {
    const cityLabels = citiesData.map(({ label }) => label);

    cities = [...new Set(cityLabels)];
    console.log("get values: >>>", cities.length);

    redisClient.set(cacheKey, JSON.stringify(cities), "EX", 60 * 2);
  }

  return Response.json({
    cities,
    content:
      "<p><strong>Jane </strong><em>hello </em></p><p></p><h1>world</h1>",
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log("updates >>>", updates);

  return Response.json({ success: true });
};

export const handle = { i18n: ["richTextLabels", "common"] };

export default function TestPage() {
  const { content, cities } = useLoaderData<typeof loader>();

  const form = useForm({
    validator: withZod(
      z.object({
        editor: z
          .string({
            required_error: "Content is required",
          })
          .trim()
          .min(1),
        cities: z
          .string()
          .trim()
          .min(1, { message: "Cities is required" })
          .regex(new RegExp(/^[a-zA-Z_\- ,]+$/), {
            message: "Must contains of: a-z, A-Z, - or _",
          }),
        city: z
          .string()
          .trim()
          .min(1, { message: "City is required" })
          .regex(new RegExp(/^[a-zA-Z_\- ,]+$/), {
            message: "Must contains of: a-z, A-Z, - or _",
          }),
        agreement: z.string().refine((value) => value === "on", {
          message: "You must accept the terms.",
        }),
        technologies: z
          .string()
          .trim()
          .refine((value) => value !== "", {
            message: "You must choose at least one option",
          }),
        textContent: z
          .string()
          .trim()
          .refine((value) => value !== "", {
            message: "Must be filled",
          }),
        favoriteTechnology: z
          .string()
          .trim()
          .min(1, { message: "Favorite technology is required" }),
        date: z.string(),
      })
    ),
    defaultValues: {
      editor: content,
      cities: ["West Alexzander", "Champaign"],
      city: "New York",
      agreement: false,
      technologies: ["Svelte"],
      textContent: "Hello world",
      favoriteTechnology: "React",
      date: "2024-12-19T02:10:00.000Z",
    },
    method: "POST",
    handleSubmit: (data) => console.log("LOG HANDLE SUBMIT", data),
  });

  return (
    <div>
      <form {...form.getFormProps()} method='POST'>
        <Group gap={30}>
          <DateTimePicker label='Date:' scope={form.scope("date")} />
          <Editor label='Content:' scope={form.scope("editor")} />
          <MultiSelectLarge
            label='Multi Select for Large Data'
            scope={form.scope("cities")}
            options={cities}
            visibleOptionsLimit={5}
          />
          <SingleSelectLarge
            label='Single Select for Large Data'
            scope={form.scope("city")}
            options={cities}
            visibleOptionsLimit={5}
          />

          <CheckboxGroup
            scope={form.scope("technologies")}
            label='Choose technologies you work with'
            options={["React", "Svelte", "Angular", "Vue"]}
          />

          <Textarea
            scope={form.scope("textContent")}
            label='Tell us about yourself'
            placeholder='Enter here...'
          />

          <RadioGroup
            scope={form.scope("favoriteTechnology")}
            label='Choose your favorite technology:'
            options={["React", "Svelte", "Angular", "Vue"]}
          />

          <Checkbox
            label='Do you agree with rules?'
            scope={form.scope("agreement")}
          />
          <Button loading={form.formState.isSubmitting} type='submit'>
            Submit
          </Button>
        </Group>
      </form>
      {/* 
      <Paper shadow='xs' p='xl'>
        <Post content={content} />
      </Paper> */}
    </div>
  );
}
