import { AiToolList } from "./AiTool.interface";

/**
 * 자동완성 기능에서 사용되는 도구 제안을 위한 인터페이스입니다.
 */

export type SuggestionTool = Pick<
  AiToolList,
  "id" | "slug" | "websiteLogo" | "name"
>;
