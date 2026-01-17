import { Metadata } from "next";

import { UserCard } from "@/components/features/user";
import { LocalSearch, DataRenderer, Pagination } from "@/components/shared";
import { CommonFilter } from "@/components/shared/filters";
import { UserFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/types";

export const metadata: Metadata = {
  title: "DevOverflow | Community",
  description:
    "Connect with developers from around the world. Browse profiles, find experts in different technologies, and build your network on DevOverflow's community page.",
};

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getUsers({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { users, isNext } = data || {};

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
            {users?.map((user) => (
              <UserCard key={user._id} {...user} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
    </>
  );
};

export default Community;
