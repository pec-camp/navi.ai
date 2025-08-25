import { formatToolDetail } from "@/src/entities/tool";

// Use any type for tool to support both Tool interface and formatted tool data
export interface CompareItem {
  tool: ReturnType<typeof formatToolDetail>;
  addedAt: Date;
}

export interface CompareList {
  items: CompareItem[];
  maxItems: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompareState {
  items: CompareItem[];
  isDrawerOpen: boolean;
}

export interface CompareActions {
  addToCompare: (tool: ReturnType<typeof formatToolDetail>) => void;
  removeFromCompare: (toolId: number) => void;
  clearCompare: () => void;
  toggleDrawer: () => void;
  isInCompare: (toolId: number) => boolean;
}

export const COMPARE_CONFIG = {
  MAX_ITEMS: 3,
  MIN_ITEMS_TO_COMPARE: 2,
  STORAGE_KEY: "ai-tools-compare-list",
} as const;