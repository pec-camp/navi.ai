"use client";

import { User } from "@supabase/supabase-js";

import { UserAvatar } from "@/features/auth/ui/UserAvatar";
import { DeleteAccountDialog, ProfileEditForm } from "@/features/profile";
import { getProfessionLabel } from "@/shared/constants/profession";

interface UserProfile {
  email: string;
  profession?: string | null;
  currentTools?: string | null;
}

interface ProfileViewProps {
  user: User;
  profile: UserProfile | null;
}

export function ProfileView({ user, profile }: ProfileViewProps) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <UserAvatar user={user} size="lg" showName={false} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            {profile?.profession && (
              <p className="mt-1 text-sm text-gray-600">
                {getProfessionLabel(profile.profession)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">프로필 정보</h2>
        <ProfileEditForm user={user} profile={profile} />
        <DeleteAccountDialog />
      </div>
    </div>
  );
}
