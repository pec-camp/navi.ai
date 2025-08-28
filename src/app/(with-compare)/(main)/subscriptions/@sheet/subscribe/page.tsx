import { redirect } from "next/navigation";

import { getCategoriesWithSub } from "@/src/entities/category";
import { getSubscriptionsCategories } from "@/src/entities/subscription/api/getSubscriptionCategories";
import { CategorySideSheet } from "@/src/features/subscription";
import { createClient } from "@/src/shared/utils/supabase/server";

export default async function Subscribe() {
  // Get current user from Supabase session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
