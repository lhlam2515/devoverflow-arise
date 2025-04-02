import dayjs from "dayjs";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileLink from "@/components/user/ProfileLink";
import Stats from "@/components/user/Stats";
import UserAvatar from "@/components/UserAvatar";
import { EMPTY_QUESTION } from "@/constants/states";
import { getUser, getUserQuestions } from "@/lib/actions/user.action";
import { RouteParams } from "@/types/global";

const Profile = async ({ params, searchParams }: RouteParams) => {
  const { id } = await params;
  const { page, pageSize } = await searchParams;

  if (!id) notFound();

  const loggedInUser = await auth();
  const { success, data, error } = await getUser({
    userId: id,
  });

  if (!success)
    return (
      <div>
        <div className="h1-bold text-dark100-light900">{error?.message}</div>
      </div>
    );

  const { user, totalQuestions, totalAnswers } = data!;
  const { _id, name, username, image, bio, portfolio, location, createdAt } =
    user;

  const {
    success: userQuestionSuccess,
    data: userQuestions,
    error: userQuestionError,
  } = await getUserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const { questions, isNext: hasMoreQuestions } = userQuestions!;

  return (
    <>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="size-[140px] rounded-full object-cover"
            fallbackClassName="text-3xl font-bold"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100-light900">{name}</h2>
            <p className="paragraph-normal text-dark200-light800">
              @{username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {portfolio && (
                <ProfileLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink imgUrl="/icons/location.svg" title="Location" />
              )}
              <ProfileLink
                imgUrl="/icons/calendar.svg"
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>

            {bio && (
              <p className="paragraph-normal text-dark400-light800 mt-8">
                {bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {loggedInUser?.user?.id === id && (
            <Button
              className="paragraph-medium! btn-secondary! text-dark300-light900! min-h-12 min-w-44 px-4 py-3"
              asChild
            >
              <Link href="/profile/edit">EditProfile</Link>
            </Button>
          )}
        </div>
      </section>

      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{
          GOLD: 0,
          SILVER: 0,
          BRONZE: 0,
        }}
      />

      <section className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-[2]">
          <TabsList className="bg-light800-dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <DataRenderer
              success={userQuestionSuccess}
              error={userQuestionError}
              data={questions}
              empty={EMPTY_QUESTION}
              render={(questions) => (
                <div className="flex w-full flex-col gap-6">
                  {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                  ))}
                </div>
              )}
            />

            <Pagination page={page} isNext={hasMoreQuestions} />
          </TabsContent>

          <TabsContent
            value="answers"
            className="mt-5 flex w-full flex-col gap-6"
          >
            List of Answers
          </TabsContent>
        </Tabs>

        <div className="flex w-full min-w-[250px] flex-1 flex-col max-lg:hidden">
          <h3 className="h3-bold text-dark200-light900">Tog Tech</h3>
          <div className="mt-7 flex flex-col gap-4">
            <p>List of Tags</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
