import { User } from "@supabase/supabase-js";

export interface UserProfile {
  email: string;
  profession?: string | null;
  currentTools?: string | null;
  avatarUrl?: string;
  displayName?: string;
}

export function getUserDisplayName(user: User): string {
  return (
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "User"
  );
}

export function getUserInitials(email: string, fullName?: string): string {
  if (fullName) {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  }
  const name = email.split("@")[0];
  return name.slice(0, 2).toUpperCase();
}

export function getUserAvatarColor(email: string): string {
  const avatarColors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-cyan-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-lime-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-amber-500",
  ];

  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}