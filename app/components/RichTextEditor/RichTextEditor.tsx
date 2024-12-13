import { useField } from "@rvf/remix";
import { useId } from "react";
/* eslint-disable import/no-named-as-default */
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, RichTextEditorLabels } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { TextInput, VisuallyHidden } from "@mantine/core";
import Placeholder from "@tiptap/extension-placeholder";

import "@mantine/tiptap/styles.css";

import { StringFieldProps } from "~/types/common.types";
import { useTranslation } from "react-i18next";

export const Editor = ({ label, scope }: StringFieldProps) => {
  const field = useField(scope);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Placeholder.configure({ placeholder: "This is placeholder" }),
    ],
    content: field.value() || "",
    onUpdate: ({ editor }) => {
      field.setValue(editor.getHTML());
    },

    immediatelyRender: false,
  });

  const inputId = useId();
  const errorId = useId();

  const { t } = useTranslation();
  const labels: Partial<RichTextEditorLabels> = t("labels", {
    ns: "richTextLabels",
    returnObjects: true,
  }) as Partial<RichTextEditorLabels>;

  return (
    <div>
      <VisuallyHidden>
        <TextInput
          label={label}
          {...field.getInputProps({
            id: inputId,
            "aria-describedby": errorId,
            "aria-invalid": !!field.error(),
          })}
        />
      </VisuallyHidden>

      <RichTextEditor editor={editor} labels={labels} variant='subtle'>
        <RichTextEditor.Toolbar sticky>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
            <RichTextEditor.H5 />
            <RichTextEditor.H6 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.CodeBlock />

            {/* <RichTextEditor.ColorPicker colors={theme.colors} /> */}
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>

      {field.error() && <span>{field.error()}</span>}
    </div>
  );
};
