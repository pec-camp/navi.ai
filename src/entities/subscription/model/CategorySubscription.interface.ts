export interface CategorySubscription {
  id: number;
  categoryId: number;
  subCategoryIds: number[];
}

export interface SubscriptionTool {
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
