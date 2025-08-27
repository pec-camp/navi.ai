import { AiToolList } from "./AiTool.interface";

export type FeaturedTool = Pick<
  AiToolList,
  | "id"
  | "name"
  | "slug"
  | "websiteLogo"
  | "description"
  | "isFree"
  | "tags"
  | "extension"
>;
