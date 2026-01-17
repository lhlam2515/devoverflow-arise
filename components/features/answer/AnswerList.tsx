import { DataRenderer, Pagination } from "@/components/shared";
import { CommonFilter } from "@/components/shared/filters";
import { AnswerFilters } from "@/constants/filters";
import { EMPTY_ANSWERS } from "@/constants/states";
import { ActionResponse, Answer } from "@/types";

import AnswerCard from "./AnswerCard";

interface Props extends ActionResponse<Answer[]> {
  page: number;
  isNext: boolean;
  totalAnswers: number;
}

const AnswerList = ({
  data,
  success,
  error,
  page,
  isNext,
  totalAnswers,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="text-primary-gradient">
          {totalAnswers} {totalAnswers > 1 ? "Answers" : "Answer"}
        </h3>

        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32"
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRenderer
        success={success}
        error={error}
        data={data}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />

      <Pagination page={page} isNext={isNext} />
    </div>
  );
};

export default AnswerList;
