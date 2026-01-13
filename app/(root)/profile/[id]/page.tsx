import dayjs from "dayjs";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { AnswerCard } from "@/components/features/answer";
import { QuestionCard } from "@/components/features/question";
import { TagCard } from "@/components/features/tag";
import { UserLink, UserStats } from "@/components/features/user";
import { UserAvatar, DataRenderer, Pagination } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EMPTY_ANSWERS, EMPTY_QUESTION, EMPTY_TAGS } from "@/constants/states";
import {
  getUser,
  getUserAnswers,
  getUserQuestions,
  getUserStats,
  getUserTopTags,
} from "@/lib/actions/user.action";
import { RouteParams } from "@/types/global";

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { id } = await params;

  const { success, data } = await getUser({ userId: id });

  if (!success || !data?.user) return {};

  const { name, username, bio } = data.user;

  return {
    title: `${name} (${username}) | DevOverflow Profile`,
    description: bio
      ? bio.slice(0, 160)
      : `Check out ${name}'s contributions and expertise on DevOverflow. View their questions, answers, and achievements in the developer community.`,
  };
}

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

  const { user } = data!;
  const { data: userStats } = await getUserStats({ userId: id });
  const { _id, name, username, image, bio, portfolio, location, createdAt } =
    user;

  const [
    {
      success: userQuestionsSuccess,
      data: userQuestions,
      error: userQuestionsError,
    },
    { success: userAnswersSuccess, data: userAnswers, error: userAnswersError },
    { success: userTopTagsSuccess, data: userTopTags, error: userTopTagsError },
  ] = await Promise.all([
    getUserQuestions({
      userId: id,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
    }),
    getUserAnswers({
      userId: id,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
    }),
    getUserTopTags({
      userId: id,
    }),
  ]);

  const { questions, isNext: hasMoreQuestions } = userQuestions!;
  const { answers, isNext: hasMoreAnswers } = userAnswers!;
  const { tags } = userTopTags!;

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
                <UserLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <UserLink imgUrl="/icons/location.svg" title="Location" />
              )}
              <UserLink
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
              className="paragraph-medium! btn-secondary! text-dark300-light900 min-h-12 min-w-44 px-4 py-3"
              asChild
            >
              <Link href="/profile/edit">EditProfile</Link>
            </Button>
          )}
        </div>
      </section>

      <UserStats
        totalQuestions={userStats?.totalQuestions || 0}
        totalAnswers={userStats?.totalAnswers || 0}
        badges={userStats?.badges || { GOLD: 0, SILVER: 0, BRONZE: 0 }}
        reputationPoints={user.reputation || 0}
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
              success={userQuestionsSuccess}
              error={userQuestionsError}
              data={questions}
              empty={EMPTY_QUESTION}
              render={(questions) => (
                <div className="flex w-full flex-col gap-6">
                  {questions.map((question) => (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      showActionBtns={
                        loggedInUser?.user?.id === question.author._id
                      }
                    />
                  ))}
                </div>
              )}
            />

            <Pagination page={page} isNext={hasMoreQuestions || false} />
          </TabsContent>

          <TabsContent
            value="answers"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <DataRenderer
              success={userAnswersSuccess}
              error={userAnswersError}
              data={answers}
              empty={EMPTY_ANSWERS}
              render={(answers) => (
                <div className="flex w-full flex-col gap-6">
                  {answers.map((answer) => (
                    <AnswerCard
                      key={answer._id}
                      {...answer}
                      content={answer.content.slice(0, 27)}
                      containerClasses="card-wrapper rounded-[10px] px-7 py-9 sm:px-11"
                      showReadMore
                      showActionBtns={
                        loggedInUser?.user?.id === answer.author._id
                      }
                    />
                  ))}
                </div>
              )}
            />

            <Pagination page={page} isNext={hasMoreAnswers || false} />
          </TabsContent>
        </Tabs>

        <div className="flex w-full min-w-[250px] flex-1 flex-col max-lg:hidden">
          <h3 className="h3-bold text-dark200-light900">Top Tech</h3>
          <div className="mt-7 flex flex-col gap-4">
            <DataRenderer
              success={userTopTagsSuccess}
              error={userTopTagsError}
              data={tags}
              empty={EMPTY_TAGS}
              render={(tags) => (
                <div className="flex w-full flex-col gap-6">
                  {tags.map((tag) => (
                    <TagCard
                      key={tag._id}
                      _id={tag._id}
                      name={tag.name}
                      questions={tag.count}
                      showCount
                      compact
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
