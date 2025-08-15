import { getCategoriesWithSub } from "@/src/entities/category";
import { CategorySideSheet } from "@/src/features/subscription";

import { getSubscriptionsCategories } from "@/src/entities/subscription";

export default async function Subscribe() {
  // Get current user from Supabase session
  // const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const userId = session.user.id;
  const userId = "1";

  // Fetch categories with tags and user subscriptions in parallel
  const [categories, categorySubscriptions] = await Promise.all([
    getCategoriesWithSub(),
    getSubscriptionsCategories(userId),
  ]);

  return (
    <CategorySideSheet
      categories={categories}
      categorySubscriptions={categorySubscriptions}
    />
  );
}
