interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
}

interface CategoryWithSubcategory {
  id: number;
  name: string;
  slug: string;
  subcategories: SubCategory[];
}

export type { Category, CategoryWithSubcategory, SubCategory };
