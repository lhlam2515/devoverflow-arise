/**
 * Hydrated Author entity (for display purposes)
 */
export interface Author {
  _id: string;
  name: string;
  image: string;
}

/**
 * Hydrated User entity (for display purposes)
 */
export interface User {
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

/**
 * Badge counts for user profile
 */
export interface BadgeCounts {
  BRONZE: number;
  SILVER: number;
  GOLD: number;
}
