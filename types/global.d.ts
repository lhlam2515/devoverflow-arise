import { NextResponse } from "next/server";

interface _Tag {
  _id: string;
  name: string;
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
  answers: number;
  views: number;
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
