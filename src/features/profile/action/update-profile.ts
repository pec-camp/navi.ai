"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/shared/utils/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || !user.email) {
    return { error: "인증되지 않은 사용자입니다." };
  }

  const profession = formData.get("profession") as string;
  const currentTools = formData.get("currentTools") as string;

  const { error } = await supabase
    .from("users")
    .update({
      profession: profession || null,
      current_tools: currentTools || null,
    })
    .eq("email", user.email);

  if (error) {
    return { error: "프로필 업데이트에 실패했습니다." };
  }

  revalidatePath("/profile");
  return { success: true };
}