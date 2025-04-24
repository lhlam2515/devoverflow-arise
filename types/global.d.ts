import { NextResponse } from "next/server";

interface _Tag {
  _id: string;
  name: string;
  question?: string;
}

interface _Author {
  _id: string;
  name: string;
  image: string;
}

interface _Question {
  _id: string;
  title: string;
  content: string;
  tags: _Tag[];
  author: _Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
}

interface Badges {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<T> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Recode<string, string>>;
  searchParams: Promise<Recode<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface _Answer {
  _id: string;
  author: _Author;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  question: string;
}

interface _Collection {
  _id: string;
  author: string | _Author;
  question: _Question;
}

interface _User {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  portfolio?: string;
  location?: string;
  reputation?: number;
  createdAt: Date;
}

interface BadgeCounts {
  BRONZE: number;
  SILVER: number;
  GOLD: number;
}

interface Job {
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

interface Country {
  name: {
    common: string;
  };
}
