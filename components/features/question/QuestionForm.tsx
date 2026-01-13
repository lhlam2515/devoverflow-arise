"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { TagCard } from "@/components/features/tag";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";
import { _Question } from "@/types/global";

const Editor = dynamic(() => import("@/components/shared/editor/Editor"), {
  ssr: false,
});

interface Props {
  question?: _Question;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Props) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (
        tagInput &&
        tagInput.length <= 15 &&
        !field.value.includes(tagInput)
      ) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag must be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    }
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?._id,
          ...data,
        });

        if (result.success) {
          toast.success("Question updated successfully!");

          if (result.data)
            router.push(ROUTES.QUESTION(result.data._id as string));
        } else {
          toast.error(`Error ${result.error}`, {
            description: result.error?.message || "Something went wrong",
          });
        }

        return;
      }

      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Question created successfully!");

        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error(`Error ${result.error}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
      <FieldGroup className="gap-10">
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-2.5">
              <FieldLabel className="paragraph-semibold! text-dark400-light800">
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                className="paragraph-normal bg-light700-dark300! border-light700-dark400 text-dark300-light700 no-focus! min-h-[56px] border"
                {...field}
              />
              <FieldDescription className="body-normal text-light-500 mt-2.5">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-2.5">
              <FieldLabel className="paragraph-semibold! text-dark400-light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>
              <Editor
                value={field.value}
                editorRef={editorRef}
                fieldChange={field.onChange}
              />
              <FieldDescription className="body-normal text-light-500 mt-2.5">
                Introduce the problem and expand on what you&apos;ve tried.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="tags"
          render={({ field, fieldState }) => (
            <Field className="flex w-full flex-col gap-3">
              <FieldLabel className="paragraph-semibold! text-dark400-light800">
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  className="paragraph-normal bg-light700-dark300! border-light700-dark400 text-dark300-light700 no-focus! min-h-[56px] border"
                  placeholder="Add tags..."
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <FieldDescription className="body-normal text-light-500 mt-2.5">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary-gradient text-light-900 w-fit cursor-pointer"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>{isEdit ? "Edit" : "Ask a question"}</>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default QuestionForm;
