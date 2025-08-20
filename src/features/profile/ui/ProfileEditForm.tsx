"use client";

import { User } from "@supabase/supabase-js";
import { Check, Pencil } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { AI_TOOLS_OPTIONS, getToolLabel } from "@/shared/constants/ai-tools";
import { getProfessionLabel, PROFESSION_OPTIONS } from "@/shared/constants/profession";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/ui/lib/utils";

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

type EditMode = null | "profession" | "tools";

const TOOLS_BY_CATEGORY = {
  "LLM & Chatbots": AI_TOOLS_OPTIONS.filter(t => t.category === "LLM"),
  "이미지 생성": AI_TOOLS_OPTIONS.filter(t => t.category === "Image"),
  "코드 어시스턴트": AI_TOOLS_OPTIONS.filter(t => t.category === "Code"),
  "글쓰기 & 콘텐츠": AI_TOOLS_OPTIONS.filter(t => t.category === "Writing"),
  "비디오": AI_TOOLS_OPTIONS.filter(t => t.category === "Video"),
  "오디오": AI_TOOLS_OPTIONS.filter(t => t.category === "Audio"),
  "디자인": AI_TOOLS_OPTIONS.filter(t => t.category === "Design"),
  "생산성": AI_TOOLS_OPTIONS.filter(t => t.category === "Productivity"),
};

export function ProfileEditForm({ user, profile }: ProfileEditFormProps) {
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Parse current tools from comma-separated string
  const currentToolsList = useMemo(() => 
    profile?.currentTools
      ?.split(",")
      .map(t => t.trim())
      .filter(Boolean) || [],
    [profile?.currentTools]
  );
  
  const [selectedProfession, setSelectedProfession] = useState(profile?.profession || "");
  const [selectedTools, setSelectedTools] = useState<string[]>(currentToolsList);
  const [tempSelectedTools, setTempSelectedTools] = useState<string[]>(currentToolsList);

  const handleSaveProfession = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("profession", selectedProfession);
      formData.append("currentTools", profile?.currentTools || "");
      
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setEditMode(null);
        window.location.reload();
      }
    } catch {
      setError("직업 정보 업데이트에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTools = async () => {
    setIsSaving(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("profession", profile?.profession || "");
      formData.append("currentTools", tempSelectedTools.join(", "));
      
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSelectedTools(tempSelectedTools);
        setEditMode(null);
        window.location.reload();
      }
    } catch {
      setError("도구 정보 업데이트에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTool = useCallback((toolValue: string) => {
    setTempSelectedTools(prev => 
      prev.includes(toolValue)
        ? prev.filter(t => t !== toolValue)
        : [...prev, toolValue]
    );
  }, []);

  const handleCancel = useCallback(() => {
    setEditMode(null);
    setSelectedProfession(profile?.profession || "");
    setTempSelectedTools(selectedTools);
    setError(null);
  }, [profile?.profession, selectedTools]);

  const handleEditTools = useCallback(() => {
    setTempSelectedTools(selectedTools);
    setEditMode("tools");
  }, [selectedTools]);

  const handleEditProfession = useCallback(() => {
    setEditMode("profession");
  }, []);

  return (
    <div className="space-y-6">
      {/* Email - Always read-only */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="text-sm font-medium text-gray-700">이메일</label>
        <p className="mt-1 text-gray-900">{user.email}</p>
      </div>
      
      {/* Profession Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">직업</label>
          {editMode !== "profession" && (
            <button
              onClick={handleEditProfession}
              className="text-blue-600 hover:text-blue-700 transition-colors"
              disabled={editMode === "tools"}
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>

        {editMode === "profession" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFESSION_OPTIONS.map((role) => {
                const isSelected = selectedProfession === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedProfession(role.value)}
                    className={cn(
                      "relative rounded-lg border p-3 text-left transition-all text-sm flex items-center",
                      isSelected
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex-1 font-medium text-gray-900">
                      {role.label}
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-500 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={handleSaveProfession} 
                disabled={isSaving || !selectedProfession}
              >
                {isSaving ? "저장 중..." : "저장"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-900">
            {getProfessionLabel(profile?.profession)}
          </p>
        )}
      </div>

      {/* AI Tools Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">사용 중인 AI 도구</label>
          {editMode !== "tools" && (
            <button
              onClick={handleEditTools}
              className="text-blue-600 hover:text-blue-700 transition-colors"
              disabled={editMode === "profession"}
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>

        {editMode === "tools" ? (
          <div className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
              {Object.entries(TOOLS_BY_CATEGORY).map(([category, tools]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-gray-600 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => {
                      const isSelected = tempSelectedTools.includes(tool.value);
                      return (
                        <button
                          key={tool.value}
                          type="button"
                          onClick={() => toggleTool(tool.value)}
                          className={cn(
                            "px-3 py-1 rounded-full text-sm font-medium transition-all",
                            isSelected
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {tool.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {tempSelectedTools.length > 0 && (
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-600 mb-2">선택된 도구 ({tempSelectedTools.length}개)</p>
                <div className="flex flex-wrap gap-2">
                  {tempSelectedTools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {getToolLabel(tool)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                size="sm"
                onClick={handleSaveTools} 
                disabled={isSaving}
              >
                {isSaving ? "저장 중..." : "저장"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                취소
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            {currentToolsList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentToolsList.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {getToolLabel(tool)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">설정되지 않음</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}