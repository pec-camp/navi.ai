"use client";

import { AnimatedSideSheet } from "@/shared/ui/AnimatedSideSheet";
import { CategoryWithSubcategory } from "@/src/entities/category";
import { CategorySubscription } from "@/src/entities/subscription";

import { CategorySelector } from "@/src/features/subscription/ui/CategorySelector";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CategorySelectorWithSheetProps {
  categories: CategoryWithSubcategory[];
  categorySubscriptions: CategorySubscription[];
}

export function CategorySideSheet({
  categories,
  categorySubscriptions,
}: CategorySelectorWithSheetProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleExitComplete = () => {
    router.back();
  };

  return (
    <AnimatedSideSheet
      isOpen={isOpen}
      onClose={handleClose}
      onExitComplete={handleExitComplete}
      side="right"
      size="lg"
    >
      <CategorySelector
        categories={categories}
        categorySubscriptions={categorySubscriptions}
        onClose={handleClose}
      />
    </AnimatedSideSheet>
  );
}
