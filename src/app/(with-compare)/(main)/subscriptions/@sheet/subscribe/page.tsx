import { redirect } from "next/navigation";

import {
  getCategoriesWithSub,
  getSubscriptionsCategories,
} from "@/src/entities/category";
import { getCurrentUser } from "@/src/features/auth";
import { CategorySideSheet } from "@/src/features/subscription";

export default async function Subscribe() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userId = user.id;

  const [categories, categorySubscriptions] = await Promise.all([
    getCategoriesWithSub(),
    getSubscriptionsCategories(userId),
  ]);

  return (
    <CategorySideSheet
      userId={userId}
      categories={categories}
      categorySubscriptions={categorySubscriptions}
    />
  );
}
