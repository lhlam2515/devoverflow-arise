/**
 * OAuth sign-in params
 */
export interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image?: string;
  };
}

/**
 * User registration credentials
 */
export interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}
