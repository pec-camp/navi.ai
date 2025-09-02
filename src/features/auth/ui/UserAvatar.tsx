import { User } from "@supabase/supabase-js";
import Image from "next/image";

import {
  getUserAvatarColor,
  getUserDisplayName,
  getUserInitials,
} from "../model/user";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function UserAvatar({
  user,
  size = "md",
  showName = true,
}: UserAvatarProps) {
  const sizeConfig = {
    sm: { classes: "h-8 w-8 text-sm", pixels: 32 },
    md: { classes: "h-10 w-10 text-base", pixels: 40 },
    lg: { classes: "h-12 w-12 text-lg", pixels: 48 },
  };

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  const displayName = getUserDisplayName(user);
  const email = user.email || "";

  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={displayName}
          width={sizeConfig[size].pixels}
          height={sizeConfig[size].pixels}
          className={`${sizeConfig[size].classes.split(" ").slice(0, 2).join(" ")} rounded-full object-cover shadow-sm ring-2 ring-white`}
        />
      ) : (
        <div
          className={`${sizeConfig[size].classes} flex items-center justify-center rounded-full font-medium text-white shadow-sm ${getUserAvatarColor(email)}`}
        >
          {getUserInitials(email, fullName)}
        </div>
      )}
      {showName && <span className="text-sm font-medium">{displayName}</span>}
    </div>
  );
}
