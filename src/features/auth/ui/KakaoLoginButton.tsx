"use client";

import { createClient } from "@/shared/utils/supabase/client";

export function KakaoLoginButton() {
  const handleKakaoLogin = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao" as any,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Kakao login error:", error);
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[#FDD835]"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3C6.477 3 2 6.582 2 10.875c0 2.801 1.873 5.25 4.673 6.605-.21 1.031-.766 3.743-.779 3.87-.019.187.07.188.147.145.061-.034 3.885-2.55 4.374-2.876.515.073 1.045.111 1.585.111 5.523 0 10-3.582 10-7.855S17.523 3 12 3z"
          fill="#000000"
        />
      </svg>
      카카오로 계속하기
    </button>
  );
}
