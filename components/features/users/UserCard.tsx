import Link from "next/link";

import { UserAvatar } from "@/components/shared";
import ROUTES from "@/constants/routes";
import { _User } from "@/types/global";

const UserCard = ({ _id, name, username, image }: _User) => (
  <div className="shadow-light100-darknone xs:w-[230px] w-full">
    <article className="bg-light900-dark200 border-light800-dark300 flex w-full flex-col items-center justify-center rounded-2xl border p-8">
      <UserAvatar
        id={_id}
        name={name}
        imageUrl={image}
        className="size-[100px] rounded-full object-cover"
        fallbackClassName="text-3xl tracking-widest"
      />

      <Link href={ROUTES.PROFILE(_id)}>
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200-light900 line-clamp-1">{name}</h3>
          <p className="body-normal text-dark500-light500 mt-2">@{username}</p>
        </div>
      </Link>
    </article>
  </div>
);
export default UserCard;
