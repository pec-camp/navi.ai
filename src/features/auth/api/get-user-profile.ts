import { createClient } from "@/shared/utils/supabase/server";
import { UserProfile } from "../model/user";

export async function getCurrentUser() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  return user;
}

export async function getUserProfile(email: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("users")
    .select("email, profession, current_tools")
    .eq("email", email)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    email: data.email,
    profession: data.profession,
    currentTools: data.current_tools,
  };
}