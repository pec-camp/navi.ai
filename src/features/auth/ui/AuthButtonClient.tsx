"use client";

import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { UserDropdown } from "./UserDropdown";
import { createClient } from "@/shared/utils/supabase/client";

interface AuthButtonClientProps {
  user: User;
}

export function AuthButtonClient({ user }: AuthButtonClientProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return <UserDropdown user={user} onSignOut={handleSignOut} />;
}