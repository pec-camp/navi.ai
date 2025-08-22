import Link from "next/link";
import { GoogleLoginButton } from "@/features/auth/ui/GoogleLoginButton";
import { KakaoLoginButton } from "@/features/auth/ui/KakaoLoginButton";

export default async function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <div className="w-full space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            소셜 계정으로 간편하게 로그인하세요
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">아직 계정이 없으신가요?</span>{" "}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}