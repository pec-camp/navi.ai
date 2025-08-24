import { AIContent } from "./AIContent.interface";

export interface ToolDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  website: string | null;
  imageUrl: string | null;
  websiteLogo: string | null;
  isFree: boolean;
  monthlyUsers: {
    count: number;
    formatted: string;
  };
  dates: {
    createdAt: Date | null;
    updatedAt: Date | null;
    createdAtFormatted: string | null;
    updatedAtFormatted: string | null;
  };
  // 서버에서 포맷팅된 AI Content (raw JSONB가 아닌 구조화된 데이터)
  content: AIContent;
}
