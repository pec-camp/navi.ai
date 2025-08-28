"use client";

import { useRouter } from "next/navigation";

import { LoginInduceModal } from "@/src/features/auth";

export default function InterceptedLoginInducePage() {
  const router = useRouter();
  
  console.log("🎯 두 레벨 위 인터셉트된 로그인 모달!");

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-lg font-bold mb-4">🎯 두 레벨 위 인터셉트 모달</h1>
        <LoginInduceModal
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              router.back();
            }
          }}
        />
      </div>
    </div>
  );
}