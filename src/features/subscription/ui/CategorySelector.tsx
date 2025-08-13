"use client";

import { Button } from "@/shared/ui/button";
import {
  CATEGORIES,
  type UserSubscription,
} from "@/src/entities/subscription/model/constants";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface CategorySelectorProps {
  onClose: () => void;
  currentSubscriptions: UserSubscription[];
  onSubscriptionUpdate: (newSubscriptions: UserSubscription[]) => void;
  showCloseButton?: boolean;
}

export function CategorySelector({
  onClose,
  currentSubscriptions,
  onSubscriptionUpdate,
  showCloseButton = true,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Set<string>
  >(new Set());

  const handleSubCategoryToggle = (subCategory: string) => {
    const newSelected = new Set(selectedSubCategories);
    if (newSelected.has(subCategory)) {
      newSelected.delete(subCategory);
    } else {
      newSelected.add(subCategory);
    }
    setSelectedSubCategories(newSelected);
  };

  // 카테고리 선택 시 현재 구독 상태로 초기화
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);

    const currentSub = currentSubscriptions.find(
      (sub) => sub.categoryId === categoryId,
    );

    if (currentSub) {
      setSelectedSubCategories(new Set(currentSub.subCategories));
    } else {
      setSelectedSubCategories(new Set());
    }
  };

  const handleComplete = () => {
    const updatedSubscriptions: UserSubscription[] = [];

    // 기존 구독 중 변경되지 않은 카테고리들 유지
    currentSubscriptions.forEach((sub) => {
      if (sub.categoryId !== selectedCategory) {
        updatedSubscriptions.push(sub);
      }
    });

    // 선택된 카테고리의 새 구독 상태 추가
    if (selectedCategory && selectedSubCategories.size > 0) {
      const categoryData = CATEGORIES.find(
        (cat) => cat.id === selectedCategory,
      );
      if (categoryData) {
        updatedSubscriptions.push({
          categoryId: selectedCategory,
          categoryName: categoryData.name,
          subCategories: Array.from(selectedSubCategories),
        });
      }
    }

    // 부모 컴포넌트에 업데이트된 구독 상태 전달
    onSubscriptionUpdate(updatedSubscriptions);
    onClose();
  };

  const selectedCategoryData = CATEGORIES.find(
    (cat) => cat.id === selectedCategory,
  );

  return (
    <div className="flex h-full flex-col rounded-md bg-card">
      {/* Header */}
      <div className="border-b border-border px-6 pb-6 pt-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold leading-[30px] text-foreground">
              나만의 AI 도구 구독하기
            </h1>
            <p className="text-sm font-light leading-[21px] text-muted-foreground">
              구독한 카테고리의 AI 도구들을 항상 최신 순으로 확인할 수 있어요!
              ✨
            </p>
          </div>
          {showCloseButton && (
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
                {CATEGORIES.map((category) => {
                  const isSubscribed = currentSubscriptions.some(
                    (sub) => sub.categoryId === category.id,
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
                        {isSubscribed && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 우측: 세부 카테고리 */}
          <section className="flex-1 p-4" aria-label="세부 카테고리">
            <div className="h-full">
              {selectedCategoryData ? (
                <div className="space-y-2">
                  <h3 className="mb-4 text-sm font-medium text-foreground">
                    {selectedCategoryData.name} 세부 항목
                  </h3>
                  <div
                    className="space-y-2"
                    role="listbox"
                    aria-label={`${selectedCategoryData.name} 세부 항목`}
                  >
                    {selectedCategoryData.subCategories.map((subCategory) => (
                      <div
                        key={subCategory}
                        onClick={() => handleSubCategoryToggle(subCategory)}
                        className={`group flex h-12 w-full cursor-pointer items-center justify-between rounded-md border p-4 text-sm transition-all ${
                          selectedSubCategories.has(subCategory)
                            ? "border-secondary bg-secondary font-light text-secondary-foreground hover:opacity-90"
                            : "hover:border-primary/50 border-border bg-background text-muted-foreground hover:bg-muted"
                        }`}
                        role="option"
                        aria-selected={selectedSubCategories.has(subCategory)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSubCategoryToggle(subCategory);
                          }
                        }}
                      >
                        <span>{subCategory}</span>
                        {selectedSubCategories.has(subCategory) ? (
                          <X
                            className="h-4 w-4 text-secondary-foreground transition-colors group-hover:text-destructive"
                            aria-label="제거"
                          />
                        ) : (
                          <Plus
                            className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground"
                            aria-label="추가"
                          />
                        )}
                      </div>
                    ))}
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
      <footer className="rounded-md border-t border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-light text-muted-foreground">
            {selectedSubCategories.size}개 구독 중
          </p>
          <Button onClick={handleComplete} variant="secondary" size="md">
            완료
          </Button>
        </div>
      </footer>
    </div>
  );
}
