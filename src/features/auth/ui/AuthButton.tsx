import Link from "next/link";

import { LOGIN_PATHNAME } from "@/shared/config/pathname";
import { Button } from "@/shared/ui";
import { getCurrentUser } from "../api/get-user-profile";
import { getUserProfile } from "../api/get-user-profile";
import { AuthButtonClient } from "./AuthButtonClient";

export default async function AuthButton() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Button asChild variant="outline">
        <Link href={LOGIN_PATHNAME}>로그인</Link>
      </Button>
    );
  }

  // Enrich user metadata with database profile if needed
  if (user.email && !user.user_metadata?.full_name) {
    const profile = await getUserProfile(user.email);
    
    if (profile?.profession) {
      user.user_metadata = {
        ...user.user_metadata,
        display_name: profile.profession
      };
    }
  }

  return <AuthButtonClient user={user} />;
}
