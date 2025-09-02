import { redirect } from "next/navigation";

import { createClient } from "@/shared/utils/supabase/server";
import { ProfileView } from "@/widgets/profile";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let profile = null;
  if (user.email) {
    const { data } = await supabase
      .from("users")
      .select("email, profession, current_tools")
      .eq("email", user.email)
      .single();

    if (data) {
      profile = {
        email: data.email,
        profession: data.profession,
        currentTools: data.current_tools,
      };
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <ProfileView user={user} profile={profile} />
    </div>
  );
}
