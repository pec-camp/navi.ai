// TODO: DB 구현 후 실제 Supabase 쿼리로 변경 필요
// import { createClient } from "@/shared/utils/supabase/server";

import { CategoryWithSubcategory } from "../model/Category.interface";

// Mock 데이터
const mockCategories: CategoryWithSubcategory[] = [
  {
    id: 1,
    name: "글쓰기",
    slug: "writing",
    subcategories: [
      { id: 1, name: "콘텐츠 작성", slug: "content-writing", categoryId: 1 },
      { id: 2, name: "번역", slug: "translation", categoryId: 1 },
      { id: 3, name: "문법 검사", slug: "grammar-check", categoryId: 1 },
      { id: 4, name: "SEO 최적화", slug: "seo-optimization", categoryId: 1 },
    ],
  },
  {
    id: 2,
    name: "디자인",
    slug: "design",
    subcategories: [
      { id: 5, name: "이미지 생성", slug: "image-generation", categoryId: 2 },
      { id: 6, name: "로고 디자인", slug: "logo-design", categoryId: 2 },
      { id: 7, name: "UI/UX 디자인", slug: "ui-ux-design", categoryId: 2 },
      { id: 8, name: "인포그래픽", slug: "infographic", categoryId: 2 },
    ],
  },
  {
    id: 3,
    name: "개발",
    slug: "development",
    subcategories: [
      { id: 9, name: "코드 생성", slug: "code-generation", categoryId: 3 },
      { id: 10, name: "버그 수정", slug: "bug-fixing", categoryId: 3 },
      { id: 11, name: "코드 리뷰", slug: "code-review", categoryId: 3 },
      { id: 12, name: "문서화", slug: "documentation", categoryId: 3 },
    ],
  },
  {
    id: 4,
    name: "마케팅",
    slug: "marketing",
    subcategories: [
      { id: 13, name: "소셜미디어", slug: "social-media", categoryId: 4 },
      {
        id: 14,
        name: "이메일 마케팅",
        slug: "email-marketing",
        categoryId: 4,
      },
      { id: 15, name: "광고 카피", slug: "ad-copy", categoryId: 4 },
      { id: 16, name: "브랜딩", slug: "branding", categoryId: 4 },
    ],
  },
];

export async function getCategoriesWithSub(): Promise<
  CategoryWithSubcategory[]
> {
  // TODO: DB 구현 후 실제 구현으로 변경
  // const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("categories")
  //   .select(`*, subcategories (*)`)
  //   .eq("parent_id", null)
  //   .order("name");
  // if (error) throw new Error("Failed to fetch categories with subcategories");
  // return data;

  // Mock 데이터 반환 (실제 DB 구조와 동일한 형태)
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 100); // 실제 API 호출 시뮬레이션
  });
}
