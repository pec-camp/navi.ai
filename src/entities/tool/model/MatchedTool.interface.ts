import { formatToolBasic } from "./formatToolData";

/**
 * 실시간 검색 팔레트에서 사용되는 도구 검색 결과를 위한 인터페이스입니다.
 */
type Tools = ReturnType<typeof formatToolBasic>;

export type MatchedTool = Pick<Tools, "id" | "slug" | "websiteLogo" | "name">;

/**
 * 검색 API 응답 타입
 */
export interface ToolSearchResponse {
  /** 검색된 도구 목록 */
  tools: MatchedTool[];

  /** 검색 쿼리 */
  query: string;

  /** 총 결과 수 */
  total: number;
}
