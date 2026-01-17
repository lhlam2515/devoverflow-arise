import { JobFilterParams, Job } from "@/types";

export const fetchLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/?fields=country");
    const location = await response.json();

    return location.country;
  } catch (error) {
    console.log("Error fetching location:", error);
  }
};

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name"
    );
    const countries = await response.json();

    return countries;
  } catch (error) {
    console.log("Error fetching countries:", error);
  }
};

export const fetchJobs = async (filters: JobFilterParams): Promise<Job[]> => {
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    { headers }
  );

  const result = await response.json();

  return result.data;
};
