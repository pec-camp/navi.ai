import { AiTool } from "./formatToolData";

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
