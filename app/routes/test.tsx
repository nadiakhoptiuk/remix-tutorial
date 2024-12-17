// import { Paper } from "@mantine/core";
import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Button } from "~/components/Button";
// import { MultiSelectField } from "~/components/MultiSelectField";
// import { Post } from "~/components/Post";
import { Editor } from "~/components/RichTextEditor/RichTextEditor";
import { SingleSelectLarge } from "~/components/SingleSelectLarge";
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
        city: z.string().min(1, { message: "City is required" }),
      })
    ),
    defaultValues: {
      editor: content,
      // cities: ["West Alexzander", "Champaign"],
      city: "",
    },
    method: "POST",
    handleSubmit: (data) => console.log("LOG HANDLE SUBMIT", data),
  });

  return (
    <div>
      <form {...form.getFormProps()} method='POST'>
        <Editor label='Content:' scope={form.scope("editor")} />
        {/* <MultiSelectField
          label='Cities'
          scope={form.scope("cities")}
          options={cities}
        /> */}
        <SingleSelectLarge
          label='Cities'
          scope={form.scope("city")}
          options={cities}
          visibleOptions={5}
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
