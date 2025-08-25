// Auto-generated route constants
// Run 'npm run generate:routes' to regenerate

export const MAIN_PATHNAME = "/";
export const ACCOUNT_PATHNAME = "/account";
export const COMPARE_PATHNAME = "/compare";
export const CONTACT_PATHNAME = "/contact";
export const HELP_PATHNAME = "/help";
export const LOGIN_PATHNAME = "/login";
export const ONBOARDING_PATHNAME = "/onboarding";
export const PRIVACY_PATHNAME = "/privacy";
export const RESET_PASSWORD_PATHNAME = "/reset-password";
export const REVIEW_FORM_PATHNAME = "/review-form";
export const SIGN_UP_PATHNAME = "/sign-up";
export const SUBSCRIPTIONS_PATHNAME = "/subscriptions";
export const SUBSCRIPTIONS_SUBSCRIBE_PATHNAME = "/subscriptions/subscribe";
export const TERMS_PATHNAME = "/terms";
export const TOOLS_PATHNAME = "/tools";
export const COMPARE_LIST_PATHNAME = "/compare-list";
export const TOOLS_SLUG_PATHNAME = (slug: string) => `/tools/${slug}`;
export const TOOLS_SLUG_FAQ_PATHNAME = (slug: string) => `/tools/${slug}/faq`;
export const TOOLS_SLUG_PRICING_PATHNAME = (slug: string) =>
  `/tools/${slug}/pricing`;
export const TOOLS_SLUG_REVIEW_FORM_PATHNAME = (slug: string) =>
  `/tools/${slug}/reviews/review-form`;
export const TOOLS_SLUG_REVIEWS_PATHNAME = (slug: string) =>
  `/tools/${slug}/reviews`;

// Export all routes for easy access
export const ROUTES = {
  MAIN_PATHNAME,
  ACCOUNT_PATHNAME,
  COMPARE_PATHNAME,
  CONTACT_PATHNAME,
  HELP_PATHNAME,
  LOGIN_PATHNAME,
  ONBOARDING_PATHNAME,
  PRIVACY_PATHNAME,
  RESET_PASSWORD_PATHNAME,
  REVIEW_FORM_PATHNAME,
  SIGN_UP_PATHNAME,
  SUBSCRIPTIONS_PATHNAME,
  SUBSCRIPTIONS_SUBSCRIBE_PATHNAME,
  TERMS_PATHNAME,
  TOOLS_PATHNAME,
  TOOLS_SLUG_PATHNAME,
  TOOLS_SLUG_FAQ_PATHNAME,
  TOOLS_SLUG_PRICING_PATHNAME,
  TOOLS_SLUG_REVIEW_FORM_PATHNAME,
  TOOLS_SLUG_REVIEWS_PATHNAME,
  COMPARE_LIST_PATHNAME,
} as const;

// Type for all static routes
export type StaticRoute =
  | "/"
  | "/account"
  | "/compare"
  | "/contact"
  | "/help"
  | "/login"
  | "/onboarding"
  | "/privacy"
  | "/reset-password"
  | "/review-form"
  | "/sign-up"
  | "/subscriptions"
  | "/subscriptions/subscribe"
  | "/terms"
  | "/tools"
  | "/compare-list";

// Type for dynamic route functions
export type DynamicRoute =
  | typeof TOOLS_SLUG_PATHNAME
  | typeof TOOLS_SLUG_FAQ_PATHNAME
  | typeof TOOLS_SLUG_PRICING_PATHNAME
  | typeof TOOLS_SLUG_REVIEW_FORM_PATHNAME
  | typeof TOOLS_SLUG_REVIEWS_PATHNAME;
