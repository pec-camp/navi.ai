"use client";

import { User } from "@supabase/supabase-js";
import { UserAvatar } from "@/features/auth/ui/UserAvatar";
import { ProfileEditForm } from "@/features/profile";

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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <UserAvatar user={user} size="lg" showName={false} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.user_metadata?.full_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            {profile?.profession && (
              <p className="text-sm text-gray-600 mt-1">
                {profile.profession}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">프로필 정보</h2>
        <ProfileEditForm user={user} profile={profile} />
      </div>

      {/* Current Tools */}
      {profile?.currentTools && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">사용 중인 AI 도구</h2>
          <div className="flex flex-wrap gap-2">
            {profile.currentTools.split(",").map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tool.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}