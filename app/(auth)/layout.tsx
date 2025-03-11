import Image from "next/image";
import { ReactNode } from "react";

import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-center min-h-screen bg-auth-light dark:bg-auth-dark bg-cover bg-center bg-no-repeat px-4 py-10">
      <section className="border-light800-dark300 bg-light800-dark200 shadow-light100-dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100-light900">Join DevFlow</h1>
            <p className="paragraph-normal text-dark500-light400">
              To get your questions answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt="DevFlow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
