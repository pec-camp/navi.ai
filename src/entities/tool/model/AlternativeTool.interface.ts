// 대안 도구 추천 관련 인터페이스

import { AiToolList } from "./AiTool.interface";

export type AlternativeTool = Pick<
  AiToolList,
  | "id"
  | "name"
  | "slug"
  | "whatIs"
  | "isFree"
  | "tags"
  | "website"
  | "websiteLogo"
  | "avgRating"
  | "reviewCount"
  | "monthlyUsers"
  | "imageUrl"
  | "pricingLabel"
  | "dates"
> & {
  similarityScore?: number;
};
