interface FeaturedTool {
  id: number;
  name: string;
  websiteLogo: string;
  whatIsSummary: string;
  slug: string;
  isFree: boolean;
  tags: string[];
}

export type { FeaturedTool };
