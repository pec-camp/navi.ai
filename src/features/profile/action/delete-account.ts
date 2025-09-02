"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/shared/utils/supabase/server";

export async function deleteAccount() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "사용자를 찾을 수 없습니다." };
  }

  // Delete user data from users table
  const { error: deleteError } = await supabase
    .from("users")
    .delete()
    .eq("email", user.email || "");

  if (deleteError) {
    return { error: "계정 삭제에 실패했습니다. 다시 시도해 주세요." };
  }

  // Sign out the user
  await supabase.auth.signOut();

  redirect("/");
}
