"use client";

import { useRouter, useSearchParams } from "next/navigation";

import LoginInduceModal from "@/src/features/auth/ui/LoginInduceModal";

export default function ReviewsLoginInduceModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("modal");
      const newUrl = params.toString()
        ? `?${params.toString()}`
        : window.location.pathname;

      router.replace(newUrl, { scroll: false });
    }
  };

  return (
    <LoginInduceModal
      open={searchParams.get("modal") === "login"}
      onOpenChange={handleOpenChange}
    />
  );
}
