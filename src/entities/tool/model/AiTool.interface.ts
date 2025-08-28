import { Tables } from "@/src/shared/utils/supabase";

import { formatToolBasic, formatToolDetail } from "./formatToolData";

export interface AiToolRawData extends Tables<"ai_tools"> {
  reviews?: { rating: number }[];
}

export type AiTool = ReturnType<typeof formatToolBasic>;

export type AiToolDetail = ReturnType<typeof formatToolDetail>;
