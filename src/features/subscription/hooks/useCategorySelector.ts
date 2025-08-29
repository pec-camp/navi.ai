import { useMemo, useReducer } from "react";

import {
  CategorySubscription,
  CategoryWithSubcategory,
} from "@/src/entities/category";

export interface CategorySelectorState {
  selectedCategory: number | null;
  currentSelected: Set<number>;
  submissionState: "idle" | "success" | "error";
  errorMessage?: string;
}

export type CategorySelectorAction =
  | { type: "SELECT_CATEGORY"; payload: number | null }
  | { type: "TOGGLE_SUBCATEGORY"; payload: number }
  | { type: "START_SUBMISSION" }
  | { type: "SUBMISSION_SUCCESS" }
  | { type: "SUBMISSION_ERROR"; payload: string }
  | { type: "RESET_STATE" }
  | { type: "RESET_TO_INITIAL"; payload: Set<number> };

function categoryReducer(
  state: CategorySelectorState,
  action: CategorySelectorAction,
): CategorySelectorState {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "TOGGLE_SUBCATEGORY": {
      const updated = new Set(state.currentSelected);
      if (updated.has(action.payload)) {
        updated.delete(action.payload);
      } else {
        updated.add(action.payload);
      }
      return {
        ...state,
        currentSelected: updated,
        submissionState: "idle",
        errorMessage: undefined,
      };
    }

    case "SUBMISSION_SUCCESS":
      return {
        ...state,
        submissionState: "success",
        errorMessage: undefined,
      };

    case "SUBMISSION_ERROR":
      return {
        ...state,
        submissionState: "error",
        errorMessage: action.payload,
      };

    case "RESET_TO_INITIAL":
      return {
        ...state,
        currentSelected: new Set(action.payload),
        submissionState: "idle",
        errorMessage: undefined,
      };

    default:
      return state;
  }
}

interface UseCategorySelectorProps {
  categories: CategoryWithSubcategory[];
  categorySubscriptions: CategorySubscription[];
}

export function useCategorySelector({
  categories,
  categorySubscriptions,
}: UseCategorySelectorProps) {
  // 초기 구독된 서브카테고리 ID들
  const initialSubscribed = useMemo(
    () =>
      new Set(
        categorySubscriptions.flatMap(
          (subscription) => subscription.subCategoryIds,
        ),
      ),
    [categorySubscriptions],
  );

  // 구독 정보가 포함된 카테고리 배열 (구독 기준으로 정렬)
  const categoriesWithSubscriptions = useMemo(() => {
    return categories
      .map((category) => {
        const subscription = categorySubscriptions.find(
          (sub) => sub.categoryId === category.id,
        );
        const hasSubscriptions = !!subscription;
        const subscriptionCount = subscription?.subCategoryIds.length || 0;

        return {
          ...category,
          hasSubscriptions,
          subscriptionCount,
        };
      })
      .sort((a, b) => {
        // 1. 구독한 카테고리 우선
        if (a.hasSubscriptions !== b.hasSubscriptions) {
          return b.hasSubscriptions ? 1 : -1;
        }
        return 0;
      });
  }, [categories, categorySubscriptions]);

  const [state, dispatch] = useReducer(categoryReducer, {
    selectedCategory: categoriesWithSubscriptions[0]?.id ?? null,
    currentSelected: initialSubscribed,
    submissionState: "idle",
  });

  // 변경 여부 확인
  const hasChanges = useMemo(() => {
    return (
      state.currentSelected.size !== initialSubscribed.size ||
      Array.from(state.currentSelected).some((id) => !initialSubscribed.has(id))
    );
  }, [state.currentSelected, initialSubscribed]);

  // 선택된 카테고리 데이터
  const selectedCategoryData = useMemo(
    () =>
      categoriesWithSubscriptions.find(
        (cat) => cat.id === state.selectedCategory,
      ),
    [categoriesWithSubscriptions, state.selectedCategory],
  );

  return {
    initialSubscribed,
    hasChanges,
    categoriesWithSubscriptions,
    selectedCategoryData,
    state,
    dispatch,
  };
}
