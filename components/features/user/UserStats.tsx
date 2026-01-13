import Image from "next/image";

import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types/global";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputationPoints: number;
}

interface BadgeCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const BadgeCard = ({ imgUrl, value, title }: BadgeCardProps) => (
  <div className="border-light800-dark300 bg-light900-dark300 shadow-light-300 dark:shadow-dark-200 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6">
    <Image src={imgUrl} alt={title} width={40} height={50} />
    <div>
      <p className="paragraph-semibold text-dark200-light900">{value}</p>
      <p className="body-medium text-dark300-light700">{title}</p>
    </div>
  </div>
);

const UserStats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputationPoints,
}: Props) => {
  return (
    <div className="mt-3">
      <h4 className="h3-semibold text-dark200-light900">
        Stats{" "}
        <span className="small-semibold text-primary-gradient">
          {formatNumber(reputationPoints)}
        </span>
      </h4>

      <div className="xs:grid-cols-2 mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="border-light800-dark300 bg-light900-dark300 shadow-light-300 dark:shadow-dark-200 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6">
          <div>
            <p className="paragraph-semibold text-dark200-light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400-light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200-light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400-light700">Answers</p>
          </div>
        </div>

        <BadgeCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badge"
        />
        <BadgeCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badge"
        />
        <BadgeCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badge"
        />
      </div>
    </div>
  );
};

export default UserStats;
