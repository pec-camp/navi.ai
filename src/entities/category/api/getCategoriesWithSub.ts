import { createClient } from "@/shared/utils/supabase/server";
import { CategoryWithSubcategory } from "../model/Category.interface";

/**
 * 카테고리와 서브카테고리 목록을 조회합니다.
 *
 * @returns 카테고리와 서브카테고리 목록
 */
export async function getCategoriesWithSub(): Promise<
  CategoryWithSubcategory[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select(
    `
      id,
      name,
      slug,
      sub_categories (
        id,
        name,
        slug,
        category_id
      )
    `,
  );
  if (error) {
    throw new Error(
      `Failed to fetch categories with subcategories: ${error.message}`,
    );
  }

  if (!data) {
    return [];
  }

  const categoriesWithSub: CategoryWithSubcategory[] = data
    .map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      subcategories: (category.sub_categories || []).map((sub) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        categoryId: sub.category_id,
      })),
    }))
    .sort((a, b) => {
      // "기타" 카테고리는 항상 맨 뒤로 배치
      const isOther = (c: CategoryWithSubcategory) => {
        const n = c.name.toLowerCase();
        return n.includes("기타");
      };

      const aOther = isOther(a) ? 1 : 0;
      const bOther = isOther(b) ? 1 : 0;
      if (aOther !== bOther) return aOther - bOther;

      // 서브카테고리 개수 내림차순
      const countDiff = b.subcategories.length - a.subcategories.length;
      if (countDiff !== 0) return countDiff;

      // 이름 오름차순
      return a.name.localeCompare(b.name);
    });

  return categoriesWithSub;
}
