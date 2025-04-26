import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileForm from "@/components/forms/ProfileForm";
import ROUTES from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";
import { _User } from "@/types/global";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const { success, data } = await getUser({ userId: session.user.id });
  if (!success) redirect(ROUTES.SIGN_IN);

  return (
    <>
      <h1 className="h1-bold tex-dark100-light900">Edit Profile</h1>

      <ProfileForm user={data?.user as _User} />
    </>
  );

  return <div>Page</div>;
};

export default Page;
