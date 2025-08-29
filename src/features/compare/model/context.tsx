"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { AiTool } from "@/entities/tool";

import {
  COMPARE_CONFIG,
  CompareActions,
  CompareItem,
  CompareState,
} from "./types";

type CompareAction =
  | { type: "ADD_ITEM"; payload: AiTool }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_ALL" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "LOAD_FROM_STORAGE"; payload: CompareItem[] };

const initialState: CompareState = {
  items: [],
  isDrawerOpen: false,
};

function compareReducer(
  state: CompareState,
  action: CompareAction,
): CompareState {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.length >= COMPARE_CONFIG.MAX_ITEMS) {
        return state;
      }

      const exists = state.items.some(
        (item) => item.tool.id === action.payload.id,
      );
      if (exists) {
        return state;
      }

      const newItem: CompareItem = {
        tool: action.payload,
        addedAt: new Date(),
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.tool.id !== action.payload),
      };
    }

    case "CLEAR_ALL": {
      return {
        ...state,
        items: [],
        isDrawerOpen: false,
      };
    }

    case "TOGGLE_DRAWER": {
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    }

    case "LOAD_FROM_STORAGE": {
      return {
        ...state,
        items: action.payload,
      };
    }

    default:
      return state;
  }
}

const CompareContext = createContext<
  (CompareState & CompareActions) | undefined
>(undefined);

interface CompareProviderProps {
  children: ReactNode;
}

export function CompareProvider({ children }: CompareProviderProps) {
  const [state, dispatch] = useReducer(compareReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(COMPARE_CONFIG.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          items: Array<CompareItem & { addedAt: string }>;
        };
        const items = parsed.items.map((item) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        dispatch({ type: "LOAD_FROM_STORAGE", payload: items });
      }
    } catch (error) {
      console.error("Failed to load compare list from storage:", error);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const dataToStore = {
        items: state.items,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        COMPARE_CONFIG.STORAGE_KEY,
        JSON.stringify(dataToStore),
      );
    } catch (error) {
      console.error("Failed to save compare list to storage:", error);
    }
  }, [state.items]);

  const actions: CompareActions = {
    addToCompare: (tool: AiTool) => {
      dispatch({ type: "ADD_ITEM", payload: tool });
    },

    removeFromCompare: (toolId: number) => {
      dispatch({ type: "REMOVE_ITEM", payload: toolId });
    },

    clearCompare: () => {
      dispatch({ type: "CLEAR_ALL" });
    },

    toggleDrawer: () => {
      dispatch({ type: "TOGGLE_DRAWER" });
    },

    isInCompare: (toolId: number) => {
      return state.items.some((item) => item.tool.id === toolId);
    },
  };

  return (
    <CompareContext.Provider value={{ ...state, ...actions }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompareContext() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompareContext must be used within a CompareProvider");
  }
  return context;
}
