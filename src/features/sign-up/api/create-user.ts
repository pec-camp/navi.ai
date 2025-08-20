"use server";

import { headers } from "next/headers";

import { User } from "@/entities/user/model/user.interface";
import { createClient } from "@/shared/utils/supabase/server";

export const createUser = async ({ email, password }: User) => {
  const headersRes = await headers();
  const origin = headersRes.get("origin");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return { message: `${error.message}` };
  }

  // If sign up successful and user created, add to users table
  if (data.user) {
    const { error: dbError } = await supabase
      .from("users")
      .insert({ email });

    if (dbError) {
      console.error("Failed to create user in database:", dbError);
    }
  }

  return { message: "SUCCESS" };
};
