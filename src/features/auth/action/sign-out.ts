"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/shared/utils/supabase/server";
import { LOGIN_PATHNAME } from "@/shared/config/pathname";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(LOGIN_PATHNAME);
}