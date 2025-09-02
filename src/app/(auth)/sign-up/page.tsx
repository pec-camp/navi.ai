import Link from "next/link";

import { GoogleLoginButton } from "@/features/auth/ui/GoogleLoginButton";
import { KakaoLoginButton } from "@/features/auth/ui/KakaoLoginButton";

export default async function SignUp() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="w-full space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">
            소셜 계정으로 간편하게 시작하세요
          </p>
        </div>

        {/* Social Signup Buttons */}
        <div className="space-y-3">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">이미 계정이 있으신가요?</span>{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
