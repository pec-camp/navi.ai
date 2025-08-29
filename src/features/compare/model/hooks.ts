"use client";

import { AiTool } from "@/src/entities/tool";

import { useCompareContext } from "./context";
import { COMPARE_CONFIG } from "./types";

export function useCompare() {
  const context = useCompareContext();

  return {
    items: context.items,
    addToCompare: context.addToCompare,
    removeFromCompare: context.removeFromCompare,
    clearCompare: context.clearCompare,
    isInCompare: context.isInCompare,
    canAddMore: context.items.length < COMPARE_CONFIG.MAX_ITEMS,
    canCompare: context.items.length >= COMPARE_CONFIG.MIN_ITEMS_TO_COMPARE,
    maxItems: COMPARE_CONFIG.MAX_ITEMS,
  };
}

export function useCompareCount() {
  const { items } = useCompareContext();
  return items.length;
}

export function useIsInCompare(toolId: number) {
  const { isInCompare } = useCompareContext();
  return isInCompare(toolId);
}

export function useCompareDrawer() {
  const { isDrawerOpen, toggleDrawer } = useCompareContext();

  return {
    isOpen: isDrawerOpen,
    toggle: toggleDrawer,
    open: () => {
      if (!isDrawerOpen) toggleDrawer();
    },
    close: () => {
      if (isDrawerOpen) toggleDrawer();
    },
  };
}

export function useCanAddToCompare(tool: AiTool) {
  const { items, isInCompare } = useCompareContext();

  const isFull = items.length >= COMPARE_CONFIG.MAX_ITEMS;
  const isAlreadyAdded = isInCompare(tool.id);

  return {
    canAdd: !isFull && !isAlreadyAdded,
    reason: isFull
      ? "최대 비교 개수에 도달했습니다"
      : isAlreadyAdded
        ? "이미 비교 목록에 있습니다"
        : null,
  };
}
