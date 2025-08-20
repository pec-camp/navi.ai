"use client";

import Link from "next/link";

import { GoogleLoginButton } from "@/features/auth/ui/GoogleLoginButton";
import { KakaoLoginButton } from "@/features/auth/ui/KakaoLoginButton";
import { useLoginActionState } from "@/features/login/model/useLoginActionState";
import { SIGN_UP_PATHNAME } from "@/shared/config/pathname";
import { Button } from "@/shared/ui/button";

export default function LoginForm() {
  const { loginFormState, loginFormAction } = useLoginActionState();

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-4 text-foreground">
      {/* Social Login Buttons */}
      <div className="flex flex-col gap-3">
        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
      
      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            또는
          </span>
        </div>
      </div>
      
      {/* Email/Password Login */}
      <form className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none"
          required
        />
        <Button className="mt-4" variant="outline" formAction={loginFormAction}>
          이메일로 로그인
        </Button>
      </form>
      
      <Button asChild>
        <Link href={SIGN_UP_PATHNAME}>회원가입</Link>
      </Button>
      
      {loginFormState?.message && (
        <p className="mt-4 p-4 text-center text-foreground text-red-500">
          {loginFormState.message}
        </p>
      )}
    </div>
  );
}
