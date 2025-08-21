import { getCategoriesWithSub } from "@/src/entities/category";
import { getSubscriptionsCategories } from "@/src/entities/subscription/api/getSubscriptionCategories";
import { CategorySideSheet } from "@/src/features/subscription";

export default async function Subscribe() {
  // Get current user from Supabase session
  // const supabase = await createClient();
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // const userId = session.user.id;
  const userId = 1;

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
