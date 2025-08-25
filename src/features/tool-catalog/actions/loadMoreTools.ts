"use server";

import { getAllToolsWithPagination, ToolFilters } from "@/entities/tool";

export async function loadMoreTools(
  limit: number,
  offset: number,
  filters?: ToolFilters
) {
  return getAllToolsWithPagination(limit, offset, filters);
}