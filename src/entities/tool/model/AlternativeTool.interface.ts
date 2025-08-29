// 대안 도구 추천 관련 인터페이스

import { AiTool } from "./formatToolData";

export type AlternativeTool = AiTool & {
  similarityScore?: number;
};
