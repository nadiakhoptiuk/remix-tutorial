// import { Paper } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Button } from "~/components/Button";
// import { Post } from "~/components/Post";
import { Editor } from "~/components/RichTextEditor/RichTextEditor";

export const loader = async () => {
  return Response.json({
    content:
      "<p><strong>Jane </strong><em>wrt </em>r</p><p></p><h1>er gwr</h1><h2>sre sr</h2><p></p><ul><li><p>ser </p></li><li><p>r gtrth</p></li><li><p>uiu,</p></li></ul>",
  });
};

export const handle = { i18n: ["richTextLabels", "common"] };

export default function TestPage() {
  const { content } = useLoaderData<typeof loader>();

  const form = useForm({
    validator: withZod(
      z.object({
        editor: z.string().trim().min(1),
      })
    ),
    defaultValues: {
      editor: content,
    },
    method: "POST",
    handleSubmit: (data) => console.log(data),
  });

  return (
    <div>
      <form {...form.getFormProps()}>
        <Editor label='Content:' scope={form.scope("editor")} />

        <Button loading={form.formState.isSubmitting}>Submit</Button>
      </form>
      {/* 
      <Paper shadow='xs' p='xl'>
        <Post content={content} />
      </Paper> */}
    </div>
  );
}
