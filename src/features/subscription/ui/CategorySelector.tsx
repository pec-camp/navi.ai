"use client";

import { Button } from "@/shared/ui/button";

import { CategoryWithSubcategory } from "@/src/entities/category";

import { CategorySubscription } from "@/src/entities/subscription";
import { Plus, X } from "lucide-react";
import { useActionState, useState, useTransition } from "react";
import {
  upsertUserSubscription,
  type SubscriptionActionState,
} from "../api/upsertUserSubscription";

interface CategorySelectorProps {
  categories: CategoryWithSubcategory[];
  categorySubscriptions: CategorySubscription[];
  onClose?: () => void;
}

export function CategorySelector({
  categories,
  categorySubscriptions,
  onClose,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  /** 구독된 서브카테고리 ID */
  const subscribedSubcategoryIds = new Set(
    categorySubscriptions.flatMap(
      (subscription) => subscription.subCategoryIds,
    ),
  );

  /** 선택된 서브카테고리 ID */
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<
    Set<number>
  >(subscribedSubcategoryIds);

  /** 구독 항목 업데이트 */
  const [, subscriptionAction] = useActionState<
    SubscriptionActionState,
    FormData
  >(upsertUserSubscription, { success: false, message: "" });

  const [isPending, startTransition] = useTransition();

  /** 카테고리 선택 시 선택 항목 업데이트 */
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  /** 서브카테고리 선택 시 선택 항목 업데이트 */
  const handleSubcategoryToggle = (subcategoryId: number) => {
    setSelectedSubcategoryIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(subcategoryId)) {
        newSet.delete(subcategoryId);
      } else {
        newSet.add(subcategoryId);
      }
      return newSet;
    });
  };

  /** 완료 버튼 클릭 시 구독 항목 업데이트 */
  const handleComplete = () => {
    const toSubscribe = Array.from(selectedSubcategoryIds).filter(
      (id) => !subscribedSubcategoryIds.has(id),
    );
    const toUnsubscribe = Array.from(subscribedSubcategoryIds).filter(
      (id) => !selectedSubcategoryIds.has(id),
    );

    console.log("완료 버튼 클릭:", {
      toSubscribe,
      toUnsubscribe,
      selectedSubcategoryIds: Array.from(selectedSubcategoryIds),
      subscribedSubcategoryIds: Array.from(subscribedSubcategoryIds),
    });

    if (toSubscribe.length > 0 || toUnsubscribe.length > 0) {
      const formData = new FormData();
      formData.append("userId", "1"); // TODO: Replace with actual user ID

      toSubscribe.forEach((id) => {
        formData.append("tagIds", id.toString());
      });

      // Add items to unsubscribe
      toUnsubscribe.forEach((id) => {
        formData.append("unsubscribeTagIds", id.toString());
      });

      startTransition(() => {
        subscriptionAction(formData);
      });
    }

    onClose?.();
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
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
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition-colors hover:bg-muted"
              aria-label="닫기"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <main className="flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          {/* 좌측: 카테고리 목록 */}
          <aside className="w-[299px] border-r border-border">
            <div className="py-4 pl-6 pr-4">
              <h2 className="mb-4 text-sm font-medium text-foreground">
                카테고리 선택
              </h2>
              <nav className="space-y-1" aria-label="카테고리 목록">
                {categories.map((category) => {
                  // Check if user has any subscriptions in this category
                  const hasSubscriptions = categorySubscriptions.find(
                    (subscription) => subscription.categoryId === category.id,
                  );

                  return (
                    <Button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      variant={
                        selectedCategory === category.id ? "secondary" : "ghost"
                      }
                      className={`h-[45px] w-full justify-start rounded-xl text-sm font-normal ${
                        selectedCategory === category.id
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      }`}
                      aria-pressed={selectedCategory === category.id}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span>{category.name}</span>
                        {hasSubscriptions && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 우측: 태그 목록 */}
          <section className="flex-1 p-4" aria-label="태그 선택">
            <div className="h-full">
              {selectedCategoryData ? (
                <div className="space-y-2">
                  <h3 className="mb-4 text-sm font-medium text-foreground">
                    {selectedCategoryData.name} 세부 항목
                  </h3>
                  <div
                    className="space-y-2"
                    role="listbox"
                    aria-label={`${selectedCategoryData.name} 태그 목록`}
                  >
                    {selectedCategoryData.subcategories.map((subcategory) => {
                      const isSelected = selectedSubcategoryIds.has(
                        subcategory.id,
                      );

                      return (
                        <div
                          key={subcategory.id}
                          onClick={() =>
                            handleSubcategoryToggle(subcategory.id)
                          }
                          className={`group flex h-12 w-full cursor-pointer items-center justify-between rounded-md border p-4 text-sm transition-all ${
                            isSelected
                              ? "border-secondary bg-secondary font-light text-secondary-foreground hover:opacity-90"
                              : "hover:border-primary/50 border-border bg-background text-muted-foreground hover:bg-muted"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleSubcategoryToggle(subcategory.id);
                            }
                          }}
                        >
                          <span>{subcategory.name}</span>
                          {isSelected ? (
                            <X
                              className="h-4 w-4 text-secondary-foreground transition-colors group-hover:text-destructive"
                              aria-label="선택 해제"
                            />
                          ) : (
                            <Plus
                              className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
                              aria-label="선택"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="h-full w-full rounded-lg border border-dashed border-border bg-surface">
                    <div className="flex h-full items-center justify-center">
                      <p className="text-base text-muted-foreground">
                        왼쪽에서 카테고리를 선택해주세요
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="rounded-b-md border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-light text-muted-foreground">
            {`${selectedSubcategoryIds.size}개 태그 선택됨`}
          </p>
          <Button
            onClick={handleComplete}
            variant="secondary"
            size="md"
            disabled={isPending}
          >
            완료
          </Button>
        </div>
      </footer>
    </div>
  );
}
