import type { Category } from "@/src/entities/category/model/Category.interface";

export interface ToolTag {
  id: number;
  name: string;
  slug: string;
}

export interface Tool {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image_url?: string;
  logo_url?: string;
  website_url?: string;
  websiteLogo?: string;
  created_at?: string;
  pricing?: "free" | "paid";
  popularity?: number;
  rating?: number;
  installs?: string | number;
  fromPriceMonth?: number;
  platforms?: string[];

  // Relations
  categories?: Category[];
  tags?: ToolTag[];
}


