"use server";

import { redirect } from "next/navigation";
import { AuthFormState } from "@/features/auth/model/auth.interface";
import { createClient } from "@/shared/utils/supabase/server";

export async function login(
  state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/");
}