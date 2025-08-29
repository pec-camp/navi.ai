import { AiTool } from "./AiTool.interface";

export type FeaturedTool = Pick<
  AiTool,
  | "id"
  | "name"
  | "slug"
  | "websiteLogo"
  | "description"
  | "isFree"
  | "tags"
  | "extension"
>;
