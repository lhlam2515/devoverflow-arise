import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { QuestionForm } from "@/components/features/question";

export const metadata: Metadata = {
  title: "DevOverflow | Ask a Question",
  description:
    "Ask the developer community for help. Post your programming questions, share code snippets, and get answers from experienced developers on DevOverflow.",
};

const AskAQuestion = async () => {
  const session = await auth();

  if (!session) return redirect("/sign-in");

  return (
    <>
      <h1 className="h1-bold text-dark100-light900">Ask a Question</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskAQuestion;
