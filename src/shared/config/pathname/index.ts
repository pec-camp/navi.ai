// Auto-generated route constants
// Run 'npm run generate:routes' to regenerate

export const MAIN_PATHNAME = "/";
export const ACCOUNT_PATHNAME = "/account";
export const COMPARE_RESULT_PATHNAME = "/compare-result";
export const CONTACT_PATHNAME = "/contact";
export const HELP_PATHNAME = "/help";
export const LOGIN_PATHNAME = "/login";
export const ONBOARDING_PATHNAME = "/onboarding";
export const PRIVACY_PATHNAME = "/privacy";
export const PROFILE_PATHNAME = "/profile";
export const RESET_PASSWORD_PATHNAME = "/reset-password";
export const SIGN_UP_PATHNAME = "/sign-up";
export const SUBSCRIPTIONS_PATHNAME = "/subscriptions";
export const TERMS_PATHNAME = "/terms";
export const TOOLS_PATHNAME = "/tools";
export const TOOLS_SLUG_PATHNAME = (slug: string) => `/tools/${slug}`;
export const TOOLS_SLUG_FAQ_PATHNAME = (slug: string) => `/tools/${slug}/faq`;
export const TOOLS_SLUG_PRICING_PATHNAME = (slug: string) => `/tools/${slug}/pricing`;
export const TOOLS_SLUG_REVIEW_FORM_PATHNAME = (slug: string) => `/tools/${slug}/review-form`;

// Export all routes for easy access
export const ROUTES = {
  MAIN_PATHNAME,
  ACCOUNT_PATHNAME,
  COMPARE_RESULT_PATHNAME,
  CONTACT_PATHNAME,
  HELP_PATHNAME,
  LOGIN_PATHNAME,
  ONBOARDING_PATHNAME,
  PRIVACY_PATHNAME,
  PROFILE_PATHNAME,
  RESET_PASSWORD_PATHNAME,
  SIGN_UP_PATHNAME,
  SUBSCRIPTIONS_PATHNAME,
  TERMS_PATHNAME,
  TOOLS_PATHNAME,
  TOOLS_SLUG_PATHNAME,
  TOOLS_SLUG_FAQ_PATHNAME,
  TOOLS_SLUG_PRICING_PATHNAME,
  TOOLS_SLUG_REVIEW_FORM_PATHNAME
} as const;

// Type for all static routes
export type StaticRoute = "/" | "/account" | "/compare-result" | "/contact" | "/help" | "/login" | "/onboarding" | "/privacy" | "/profile" | "/reset-password" | "/sign-up" | "/subscriptions" | "/terms" | "/tools";

// Type for dynamic route functions
export type DynamicRoute = typeof TOOLS_SLUG_PATHNAME | typeof TOOLS_SLUG_FAQ_PATHNAME | typeof TOOLS_SLUG_PRICING_PATHNAME | typeof TOOLS_SLUG_REVIEW_FORM_PATHNAME;
