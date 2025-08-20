interface SubscriptionTool {
  id: number;
  name: string;
  website_logo?: string;
  image_url?: string;
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

export type { SubscriptionTool };
