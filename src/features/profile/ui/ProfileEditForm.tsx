"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/shared/ui";
import { updateProfile } from "../action/update-profile";

interface UserProfile {
  email: string;
  profession?: string | null;
  currentTools?: string | null;
}

interface ProfileEditFormProps {
  user: User;
  profile: UserProfile | null;
}

export function ProfileEditForm({ user, profile }: ProfileEditFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setError(null);
    
    try {
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setIsEditing(false);
      }
    } catch (err) {
      setError("프로필 업데이트에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">이메일</label>
          <p className="mt-1 text-gray-900">{user.email}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">직업</label>
          <p className="mt-1 text-gray-900">
            {profile?.profession || "설정되지 않음"}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">사용 중인 도구</label>
          <p className="mt-1 text-gray-900">
            {profile?.currentTools || "설정되지 않음"}
          </p>
        </div>

        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="mt-4"
        >
          프로필 편집
        </Button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          disabled
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
        />
      </div>

      <div>
        <label htmlFor="profession" className="text-sm font-medium text-gray-700">
          직업
        </label>
        <input
          type="text"
          id="profession"
          name="profession"
          defaultValue={profile?.profession || ""}
          placeholder="예: 개발자, 디자이너, 마케터"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="currentTools" className="text-sm font-medium text-gray-700">
          사용 중인 AI 도구
        </label>
        <input
          type="text"
          id="currentTools"
          name="currentTools"
          defaultValue={profile?.currentTools || ""}
          placeholder="예: ChatGPT, Claude, Midjourney (쉼표로 구분)"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">
          여러 도구는 쉼표(,)로 구분해주세요
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "저장 중..." : "저장"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsEditing(false);
            setError(null);
          }}
          disabled={isSaving}
        >
          취소
        </Button>
      </div>
    </form>
  );
}