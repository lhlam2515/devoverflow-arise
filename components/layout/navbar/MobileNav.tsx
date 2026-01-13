import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/routes";

import NavLinks from "./NavLinks";

const MobileNav = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light900-dark200 border-none px-4 py-3"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/site-logo.svg"
            width={23}
            height={23}
            alt="Logo"
          />

          <p className="h2-bold font-space-grotesk text-dark100-light900">
            Dev<span className="text-primary-500">Flow</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose asChild>
                <form
                  action={async () => {
                    "use server";

                    await signOut();
                  }}
                >
                  <Button
                    type="submit"
                    className="base-medium! w-fit cursor-pointer bg-transparent! px-4 py-3"
                  >
                    <LogOut className="size-5 text-black dark:text-white" />
                    <span className="text-dark300-light900">Logout</span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button
                    className="small-medium! btn-secondary! min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                    asChild
                  >
                    <Link href={ROUTES.SIGN_IN}>
                      <span className="text-primary-gradient">Log In</span>
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    className="small-medium! btn-tertiary! border-light700-dark400 text-dark400-light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
                    asChild
                  >
                    <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
