export interface SubscriptionActionState {
  success: boolean;
  message: string;
  data?: {
    subscribedSubCategoryIds: number[];
    totalCount: number;
  };
}
