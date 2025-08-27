import { Tables } from "@/src/shared/utils/supabase";

import { formatToolBasic, formatToolDetail } from "./formatToolData";

export interface AiToolRawData extends Tables<"ai_tools"> {
  reviews: { rating: number }[];
}

export type AiToolList = ReturnType<typeof formatToolBasic>;

export type AiToolDetailList = ReturnType<typeof formatToolDetail>;
