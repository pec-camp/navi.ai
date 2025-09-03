import {
  getCategoriesWithSub,
  getSubscriptionsCategories,
} from "@/src/entities/category";
import { CategorySideSheet } from "@/src/features/subscription";

interface CategorySideSheetAsyncProps {
  userId: string;
  isOpen: boolean;
}

export default async function CategorySideSheetAsync({
  userId,
  isOpen,
}: CategorySideSheetAsyncProps) {
  const [categories, subscriptions] = await Promise.all([
    getCategoriesWithSub(),
    getSubscriptionsCategories(userId),
  ]);

  return (
    <>
      {isOpen && (
        <CategorySideSheet
          userId={userId}
          categories={categories}
          categorySubscriptions={subscriptions}
          isOpen={isOpen}
        />
      )}
    </>
  );
}
