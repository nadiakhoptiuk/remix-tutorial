// import { Paper } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Button } from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { MultiSelectLarge } from "~/components/MultiSelectLarge";
// import { Post } from "~/components/Post";
import { Editor } from "~/components/RichTextEditor/RichTextEditor";
import { SingleSelectLarge } from "~/components/SingleSelectLarge";
import { CheckboxGroup } from "~/components/CheckboxGroup";

import citiesData from "~/constants/citiesData.json";

export const loader = async () => {
  const cityLabels = citiesData.map(({ label }) => label);

  const cities = [...new Set(cityLabels)];

  return Response.json({
    cities,
    content:
      "<p><strong>Jane </strong><em>wrt </em>r</p><p></p><h1>er gwr</h1><h2>sre sr</h2><p></p><ul><li><p>ser </p></li><li><p>r gtrth</p></li><li><p>uiu,</p></li></ul>",
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
        cities: z.string().trim().min(1, { message: "Cities is required" }),
        city: z.string().trim().min(1, { message: "City is required" }),
        agreement: z.string().refine((value) => value === "on", {
          message: "You must accept the terms.",
        }),
        technologies: z.string().refine((value) => value !== "", {
          message: "You must choose at least one option",
        }),
      })
    ),
    defaultValues: {
      editor: content,
      cities: ["West Alexzander", "Champaign"],
      city: "",
      agreement: false,
      technologies: ["React"],
    },
    method: "POST",
    handleSubmit: (data) => console.log("LOG HANDLE SUBMIT", data),
  });

  return (
    <div>
      <form {...form.getFormProps()} method='POST'>
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
          visibleOptions={5}
        />
        <Checkbox
          label='Do you agree with rules?'
          scope={form.scope("agreement")}
        />
        <CheckboxGroup
          scope={form.scope("technologies")}
          label='Choose technologies you work with'
          options={["React", "Svelte", "Angular", "Vue"]}
        />

        <Button loading={form.formState.isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
      {/* 
      <Paper shadow='xs' p='xl'>
        <Post content={content} />
      </Paper> */}
    </div>
  );
}
