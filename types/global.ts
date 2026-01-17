import { NextResponse } from "next/server";

/**
 * Generic action response type
 */
export type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

/**
 * Success response type
 */
export type SuccessResponse<T = null> = ActionResponse<T> & { success: true };

/**
 * Error response type - generic to be compatible with ActionResponse<T>
 */
export type ErrorResponse<T = never> = ActionResponse<T> & { success: false };

/**
 * API error response type
 */
export type APIErrorResponse = NextResponse<ErrorResponse>;

/**
 * API response type
 */
export type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>;

/**
 * Badge types
 */
export interface Badges {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}
