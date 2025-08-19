interface SubscriptionResponse {
  sub_category_id: number;
  sub_categories: {
    id: number;
    category_id: number;
    categories: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

interface CategorySubscription {
  id: string;
  categoryId: number;
  subCategoryIds: number[];
}

interface SubscriptionTool {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  rating: number;
  description: string;
  price: string;
  date: string;
  reviewCount: number;
}

export type { CategorySubscription, SubscriptionResponse, SubscriptionTool };
