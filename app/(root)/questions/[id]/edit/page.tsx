import { notFound, redirect } from "next/navigation";
import React from "react";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { RouteParams } from "@/types/global";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect("/sign-in");

  const { success, data: question } = await getQuestion({ questionId: id });
  if (!success) return notFound();

  if (question?.author._id.toString() !== session?.user?.id) {
    redirect(ROUTES.QUESTION(id));
  }

  return (
    <main>
      <div className="mt-9">
        <QuestionForm question={question} isEdit />
      </div>
    </main>
  );
};

export default EditQuestion;
