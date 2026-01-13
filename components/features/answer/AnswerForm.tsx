"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import { extractOuterMarkdownContent } from "@/lib/utils";
import { AnswerSchema } from "@/lib/validations";

const Editor = dynamic(() => import("@/components/shared/editor/Editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();

  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      if (result.success) {
        form.reset();

        toast.success("Your answer has been posted successfully!");

        editorRef.current?.setMarkdown("");
      } else {
        toast.error("Failed to post your answer", {
          description: result.error?.message,
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error("Please log in to use AI features.");
    }

    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown() || "";

    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer
      );

      if (!success) {
        return toast.error("Failed to generate AI answer", {
          description: error?.message,
        });
      }

      const answer = extractOuterMarkdownContent(data) || data;
      const formattedAnswer = answer?.replace(/<br>/g, " ").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer!);
        form.setValue("content", formattedAnswer!);
        form.trigger("content");
      }

      toast.success("AI answer generated successfully!");
    } catch (error) {
      toast.error("Failed to generate AI answer", {
        description:
          error instanceof Error
            ? error.message
            : "There was an problem with your request",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400-light800">
          Write your answer here
        </h4>
        <Button
          className="btn-primary! border-light700-dark400 text-primary-500 dark:text-primary-500 cursor-pointer gap-1.5 rounded-md px-4 py-2.5 shadow-none"
          disabled={isAISubmitting}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-6 flex w-full flex-col gap-10"
      >
        <FieldGroup className="gap-10">
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col gap-3">
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary-gradient text-light-900 w-fit cursor-pointer"
            >
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};
export default AnswerForm;
