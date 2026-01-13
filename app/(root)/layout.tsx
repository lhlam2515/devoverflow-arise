import { ReactNode } from "react";

import { LeftSidebar, RightSidebar } from "@/components/layout";
import { Navbar } from "@/components/layout/navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-light850-dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pt-36 pb-6 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
