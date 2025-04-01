import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/types/global";

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100-light900">All Users</h1>

      <h1 className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          imgSrc="/icons/search.svg"
          placeholder="There are some great devs here!"
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={UserFilters}
          otherClasses="min-h-[56px] w-full sm:min-w-[170px]"
        />
      </h1>

      <DataRenderer
        success={success}
        error={error}
        data={users}
        empty={EMPTY_USERS}
        render={(users) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users?.map((user) => <UserCard key={user._id} {...user} />)}
          </div>
        )}
      />
    </>
  );
};

export default Community;
