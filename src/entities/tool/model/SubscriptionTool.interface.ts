interface SubscriptionToolResponse {
  id: string;
  slug: string;
  website_name: string;
  website_logo?: string;
  image_url?: string;
  website: string;
  sub_category_name: string;
  sub_category_id: string;
  avg_rating: number;
  what_is_summary: string;
  is_free_plan: boolean;
  is_paid_plan: boolean;
  is_freemium: boolean;
  has_trial: boolean;
  is_contact: boolean;
  original_created_at: string;
  review_count: number;
}

interface SubscriptionToolData {
  id: string;
  slug: string;
  name: string;
  websiteLogo?: string;
  imageUrl?: string;
  website?: string;
  category: string;
  categoryId: string;
  rating: number;
  summary: string;
  isFreePlan: boolean;
  isPaidPlan: boolean;
  isFreemium: boolean;
  hasTrial: boolean;
  isContact: boolean;
  date: string;
  reviewCount: number;
}

interface SubscriptionTool {
  tools: SubscriptionToolData[];
  totalCount: number;
}

export type {
  SubscriptionTool,
  SubscriptionToolData,
  SubscriptionToolResponse,
};
