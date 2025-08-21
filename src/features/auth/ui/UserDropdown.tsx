"use client";

import { User } from "@supabase/supabase-js";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";

interface UserDropdownProps {
  user: User;
  onSignOut: () => void;
}

export function UserDropdown({ user, onSignOut }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 transition-colors"
      >
        <UserAvatar user={user} size="sm" showName={true} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <UserAvatar user={user} size="md" />
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
            
            <div className="p-2">
              <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <UserIcon className="h-4 w-4" />
                프로필
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Settings className="h-4 w-4" />
                설정
              </button>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={onSignOut}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}