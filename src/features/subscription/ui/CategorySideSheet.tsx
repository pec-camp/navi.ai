"use client";

import { AnimatedSideSheet } from "@/shared/ui";
import { CategoryWithSubcategory } from "@/src/entities/category";

import { CategorySubscription } from "@/src/entities/subscription";
import { useSideSheet } from "@/src/shared/hooks";
import { Button } from "@/src/shared/ui";
import { RotateCcw, X } from "lucide-react";
import { useTransition } from "react";
import {
  SubscriptionUpdateRequest,
  replaceUserSubscriptions,
} from "../api/replaceUserSubscriptions";
import { useCategorySelector } from "../hooks/useCategorySelector";
import CategoryNav from "./CategoryNav";
import SubcategoryPanel from "./SubcategoryPanel";

interface CategorySelectorWithSheetProps {
  userId: number;
  categories: CategoryWithSubcategory[];
  categorySubscriptions: CategorySubscription[];
}

export default function CategorySideSheet({
  userId,
  categories,
  categorySubscriptions,
}: CategorySelectorWithSheetProps) {
  const { isOpen, handleClose, handleExitComplete } = useSideSheet();

  const {
    initialSubscribed,
    hasChanges,
    categoriesWithSubscriptions,
    selectedCategoryData,
    state,
    dispatch,
  } = useCategorySelector({
    categories,
    categorySubscriptions,
  });

  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    if (!hasChanges) {
      handleClose?.();
      return;
    }

    const request: SubscriptionUpdateRequest = {
      userId,
      subCategoryIds: Array.from(state.currentSelected),
    };

    startTransition(async () => {
      try {
        const result = await replaceUserSubscriptions(request);
        if (result.success) {
          dispatch({ type: "SUBMISSION_SUCCESS" });
          handleClose?.();
        } else {
          dispatch({ type: "SUBMISSION_ERROR", payload: result.message });
        }
      } catch (error) {
        dispatch({
          type: "SUBMISSION_ERROR",
          payload: "구독 업데이트 중 오류가 발생했습니다.",
        });
      }
    });
  };

  return (
    <AnimatedSideSheet
      isOpen={isOpen}
      onClose={handleClose}
      onExitComplete={handleExitComplete}
      side="right"
      size="lg"
    >
      <div className="flex h-full flex-col rounded-md bg-card">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold leading-[30px] text-foreground">
                나만의 AI 도구 구독하기
              </h1>
              <p className="text-sm font-light leading-[21px] text-muted-foreground">
                구독한 카테고리의 AI 도구들을 항상 최신 순으로 확인할 수 있어요
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
              aria-label="닫기"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="flex flex-1 overflow-hidden">
          <div className="flex h-full w-full">
            <CategoryNav
              categories={categoriesWithSubscriptions}
              selectedCategory={state.selectedCategory}
              onCategorySelect={(categoryId) =>
                dispatch({ type: "SELECT_CATEGORY", payload: categoryId })
              }
            />
            <SubcategoryPanel
              selectedCategoryData={selectedCategoryData}
              currentSelected={state.currentSelected}
              onSubcategoryToggle={(subcategoryId) =>
                dispatch({
                  type: "TOGGLE_SUBCATEGORY",
                  payload: subcategoryId,
                })
              }
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="rounded-b-md border border-border bg-card p-4">
          {state.errorMessage && (
            <div className="bg-destructive/10 mb-4 rounded-md p-4 text-sm text-destructive">
              {state.errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-light text-muted-foreground">
                {state.currentSelected.size}개 태그 선택됨
              </p>
              <button
                onClick={() =>
                  dispatch({
                    type: "RESET_TO_INITIAL",
                    payload: initialSubscribed,
                  })
                }
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!hasChanges || isPending}
                aria-label="선택 초기화"
                title="선택 초기화"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleComplete}
                variant="secondary"
                size="md"
                disabled={isPending}
              >
                {isPending ? "처리 중..." : "완료"}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedSideSheet>
  );
}
