"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/shared/utils/supabase/server";

interface SaveOnboardingPayload {
  role: string | null;
  tools: string[]; // 사용 중인 AI 도구 이름 목록
}

export async function saveOnboarding({ role, tools }: SaveOnboardingPayload) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Unauthorized" };
  }

  const { error } = await supabase.from("user_profiles").upsert(
    {
      id: user.id,
      role,
      ai_tools: tools,
    },
    { onConflict: "id" },
  );

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/onboarding");
  return { ok: true };
}
