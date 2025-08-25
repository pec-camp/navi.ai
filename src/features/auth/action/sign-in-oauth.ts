"use server";

import { headers } from "next/headers";

import { createClient } from "@/shared/utils/supabase/server";

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersRes = await headers();
  const origin = headersRes.get("origin");
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function signInWithKakao() {
  const supabase = await createClient();
  const headersRes = await headers();
  const origin = headersRes.get("origin");
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao" as any,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
}