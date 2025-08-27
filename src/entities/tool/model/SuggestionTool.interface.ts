import { formatToolBasic } from "./formatToolData";

/**
 * 자동완성 기능에서 사용되는 도구 제안을 위한 인터페이스입니다.
 * 빠른 응답을 위해 최소한의 필드만 포함합니다.
 */
type Tools = ReturnType<typeof formatToolBasic>;

export type SuggestionTool = Pick<Tools, "id" | "slug" | "websiteLogo" | "name">;
