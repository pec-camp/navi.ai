"use client";

import { useRouter, useSearchParams } from "next/navigation";

import LoginInduceModal from "@/src/features/auth/ui/LoginInduceModal";

interface ReviewsLoginModalProps {
  isOpen: boolean;
}

export default function ReviewsLoginInduceModal({
  isOpen,
}: ReviewsLoginModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;
      router.push(newUrl);
    }
  };

  return <LoginInduceModal open={isOpen} onOpenChange={handleOpenChange} />;
}
