import { CategoryWithSubcategory } from "@/src/entities/category";
import { Plus } from "lucide-react";

interface SubcategoryPanelProps {
  selectedCategoryData:
    | (CategoryWithSubcategory & { hasSubscriptions: boolean })
    | undefined;
  currentSelected: Set<number>;
  onSubcategoryToggle: (subcategoryId: number) => void;
}

export default function SubcategoryPanel({
  selectedCategoryData,
  currentSelected,
  onSubcategoryToggle,
}: SubcategoryPanelProps) {
  return (
    <section className="flex-1 overflow-y-auto p-4" aria-label="태그 선택">
      <div className="flex h-full flex-col">
        {selectedCategoryData ? (
          <div className="flex h-full flex-col">
            <h3 className="mb-4 text-sm font-medium text-foreground">
              {selectedCategoryData.name} 세부 항목
            </h3>
            <div
              className="grid grid-cols-2 gap-4 pb-4 pr-2"
              role="listbox"
              aria-label={`${selectedCategoryData.name} 태그 목록`}
            >
              {selectedCategoryData.subcategories.map((subcategory) => {
                const isSelected = currentSelected.has(subcategory.id);

                return (
                  <div
                    key={subcategory.id}
                    onClick={() => onSubcategoryToggle(subcategory.id)}
                    className={`group flex h-12 w-full cursor-pointer items-center justify-between rounded-md border p-4 text-sm transition-all ${
                      isSelected
                        ? "border-secondary bg-secondary font-light text-secondary-foreground"
                        : "hover:border-primary/50 border-border bg-background text-muted-foreground"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSubcategoryToggle(subcategory.id);
                      }
                    }}
                  >
                    <span>{subcategory.name}</span>
                    <Plus
                      className={`h-4 w-4 transition-all duration-200 ease-in-out ${
                        isSelected
                          ? "rotate-45 text-secondary-foreground"
                          : "rotate-0 text-muted-foreground"
                      }`}
                      aria-label={isSelected ? "선택 해제" : "선택"}
                    />
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
  );
}
