/**
 * Job listing entity
 */
export interface Job {
  job_id?: string;
  employer_name?: string;
  employer_logo?: string | undefined;
  employer_website?: string;
  job_employment_type?: string;
  job_title?: string;
  job_description?: string;
  job_apply_link?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
}

/**
 * Country information from external API
 */
export interface Country {
  name: {
    common: string;
  };
}

/**
 * Global search result item
 */
export interface GlobalSearchedItem {
  id: string;
  type: "question" | "answer" | "user" | "tag";
  title: string;
}
