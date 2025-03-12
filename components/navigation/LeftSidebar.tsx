import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";

import NavLinks from "./navbar/NavLinks";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar bg-light900-dark200 border-light800-dark300 shadow-light-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-[266px] dark:shadow-none">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="small-medium! btn-secondary! min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_IN}>
            <Image
              src="/icons/account.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="text-primary-gradient max-lg:hidden">Log In</span>
          </Link>
        </Button>

        <Button
          asChild
          className="small-medium! btn-tertiary! border-light700-dark400 text-dark400-light900! min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/sign-up.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="max-lg:hidden">Sign Up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;
