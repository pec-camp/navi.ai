import { Button } from "@/shared/ui/button";
import { CategoryWithSubcategory } from "@/src/entities/category";

interface CategoryNavProps {
  categories: (CategoryWithSubcategory & { hasSubscriptions: boolean })[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number) => void;
}

export function CategoryNav({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryNavProps) {
  return (
    <aside className="w-[299px] border-r border-border">
      <div className="flex h-full flex-col overflow-y-auto py-4 pl-6 pr-4">
        <h2 className="mb-4 text-sm font-medium text-foreground">
          카테고리 선택
        </h2>
        <nav className="flex-1 space-y-1" aria-label="카테고리 목록">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              variant={selectedCategory === category.id ? "secondary" : "ghost"}
              className={`group h-[45px] w-full justify-start rounded-xl text-sm font-normal ${
                selectedCategory === category.id
                  ? "bg-secondary text-secondary-foreground hover:opacity-100"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              aria-pressed={selectedCategory === category.id}
            >
              <div className="flex w-full items-center justify-between">
                <span>{category.name}</span>
                <div className="flex items-center gap-2">
                  {category.hasSubscriptions && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
