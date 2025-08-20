import { MergeDeep } from "type-fest";

import { Database as DatabaseGenerated } from "./database.types";

/** 유저 구독 도구 목록 및 총 개수 조회 RPC 함수 반환 타입 정의 */
interface SubscribedToolsResponse {
  tools: {
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
  }[];
  totalCount: number;
}

// 타입 오버라이드
export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Functions: {
        get_user_subscribed_tools: {
          Args: {
            input_limit?: number;
            input_offset?: number;
            input_user_id: number;
          };
          Returns: SubscribedToolsResponse;
        };
      };
    };
  }
>;

// 기존 타입들 재내보내기
export type { Json } from "./database.types";

// 헬퍼 타입들
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
