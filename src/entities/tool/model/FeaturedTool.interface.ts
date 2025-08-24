interface FeaturedTool {
  id: number;
  name: string;
  websiteLogo?: string;
  whatIsSummary?: string;
  slug: string;
  isFree?: boolean;
  tags?: string[];
  extension?: {
    userNum: string;
    userNumRaw: number;
    avatar: string;
  } | null;
}

export type { FeaturedTool };
