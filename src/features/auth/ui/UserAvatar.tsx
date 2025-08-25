import { User } from "@supabase/supabase-js";

import { getUserAvatarColor, getUserDisplayName,getUserInitials } from "../model/user";

interface UserAvatarProps {
  user: User;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export function UserAvatar({ user, size = "md", showName = true }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const avatarUrl = user.user_metadata?.avatar_url;
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  const displayName = getUserDisplayName(user);
  const email = user.email || "";

  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={displayName}
          className={`${sizeClasses[size].split(" ").slice(0, 2).join(" ")} rounded-full object-cover ring-2 ring-white shadow-sm`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} flex items-center justify-center rounded-full text-white font-medium shadow-sm ${getUserAvatarColor(email)}`}
        >
          {getUserInitials(email, fullName)}
        </div>
      )}
      {showName && <span className="text-sm font-medium">{displayName}</span>}
    </div>
  );
}