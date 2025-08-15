export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
}

export interface CategoryWithSubcategory {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}
