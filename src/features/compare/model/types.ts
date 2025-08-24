import { Tool } from "@/entities/tool";

export interface CompareItem {
  tool: Tool;
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
  addToCompare: (tool: Tool) => void;
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