import { Metadata } from "next";

import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/filters/JobFilter";
import Pagination from "@/components/Pagination";
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from "@/lib/actions/job.action";
import { RouteParams, Job } from "@/types/global";

export const metadata: Metadata = {
  title: "DevOverflow | Jobs",
  description:
    "Explore a wide range of job opportunities in the tech industry. Find your dream job, connect with top companies, and advance your career.",
};

const Page = async ({ searchParams }: RouteParams) => {
  const { query, location, page } = await searchParams;
  const userLocation = await fetchLocation();

  const jobs = await fetchJobs({
    query: `${query},${location}` || `Software Engineer in ${userLocation}`,
    page: page ?? 1,
  });

  const countries = await fetchCountries();
  const parsedPage = parseInt(page ?? 1);

  return (
    <>
      <h1 className="h1-bold text-dark100-light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="border-light800-dark300 mt-11 mb-9 flex flex-col gap-9 border-b pb-9">
        {jobs?.length > 0 ? (
          jobs
            ?.filter((job: Job) => job.job_title)
            .map((job: Job) => <JobCard key={job.job_id} job={job} />)
        ) : (
          <div className="paragraph-normal text-dark200-light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination page={parsedPage} isNext={jobs?.length === 10} />
      )}
    </>
  );
};

export default Page;
