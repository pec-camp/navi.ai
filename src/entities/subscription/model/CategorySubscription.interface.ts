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

export type { CategorySubscription, SubscriptionResponse };
