import { useForm } from "@rvf/remix";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Editor } from "~/components/RichTextEditor/RichTextEditor";
import { SubmitButton } from "~/components/SubmitButton";

export default function TestPage() {
  const form = useForm({
    validator: withZod(
      z.object({
        editor: z.string().trim().min(1),
      })
    ),
    defaultValues: {
      editor: "Jane",
    },
    method: "POST",
    handleSubmit: (data) => console.log(data),
  });

  return (
    <div>
      <form {...form.getFormProps()}>
        <Editor label='Content:' scope={form.scope("editor")} />

        <SubmitButton
          defaultLabel='Submit'
          loading={form.formState.isSubmitting}
        />
      </form>
    </div>
  );
}
