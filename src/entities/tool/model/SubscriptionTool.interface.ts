// 구독 도구 관련 인터페이스

import { AiTool } from "./formatToolData";

export type SubscriptionTool = AiTool & {
  subcategoryId: number;
  subcategoryName: string;
};

export interface SubscriptionToolListResponse {
  tools: SubscriptionTool[];
  totalCount: number;
}
