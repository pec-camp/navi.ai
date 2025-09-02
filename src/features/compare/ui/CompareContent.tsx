"use client";

import { ArrowRight, Trash2, TrendingUp, User2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AiTool } from "@/entities/tool";
import { useAuth } from "@/features/auth/hooks/useAuth";
import LoginInduceModal from "@/features/auth/ui/LoginInduceModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import { ToolLogo } from "@/shared/ui/ToolLogo";
import { getPricingDisplay } from "@/src/shared/utils/getPricingDisplay";

import { useCompare } from "../model";

interface CompareContentProps {
  onClose: () => void;
}

export default function CompareContent({ onClose }: CompareContentProps) {
  const { items, removeFromCompare, clearCompare, canCompare } = useCompare();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleCompare = () => {
    if (!canCompare) {
      console.log("Cannot compare - need at least 2 items");
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    const toolSlugs = items
      .map((item) => item.tool.slug)
      .filter((slug) => slug && slug !== "")
      .join(",");

    if (toolSlugs) {
      const url = `/compare-result?tools=${toolSlugs}`;
      console.log("Navigating to:", url);

      // Close the sheet (this will set the navigation flag)
      onClose();

      // Navigate immediately
      router.push(url);
    } else {
      console.error("No valid slugs found in items:", items);
    }
  };

  const handleClearAll = () => {
    clearCompare();
    setShowClearDialog(false);
  };

  return (
    <>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                비교할 도구
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                최대 3개까지 선택 가능 ({items.length}/3)
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-muted"
              aria-label="닫기"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <CompareToolCard
                  key={item.tool.id}
                  tool={item.tool}
                  onRemove={() => removeFromCompare(item.tool.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">비교할 도구가 없습니다</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  도구 카드에서 &quot;비교&quot; 버튼을 눌러 추가하세요
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="bg-background/95 mt-auto border-t border-border">
            <div className="space-y-3 px-6 py-5">
              <Button
                type="button"
                onClick={handleCompare}
                disabled={!canCompare}
                className="h-12 w-full text-base font-medium shadow-sm"
                size="lg"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                {canCompare
                  ? `${items.length}개 도구 비교하기`
                  : "최소 2개 이상 선택하세요"}
              </Button>

              <button
                onClick={() => setShowClearDialog(true)}
                className="hover:bg-destructive/5 w-full rounded-md py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-destructive"
              >
                <Trash2 className="mr-1.5 inline h-4 w-4" />
                전체 삭제
              </button>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>비교 목록 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              모든 비교 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearAll}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LoginInduceModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </>
  );
}

interface CompareToolCardProps {
  tool: AiTool;
  onRemove: () => void;
}

function CompareToolCard({ tool, onRemove }: CompareToolCardProps) {
  const pricing = getPricingDisplay(tool.isFree, tool.pricingLabel);

  return (
    <div className="hover:bg-muted/50 flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors">
      <ToolLogo
        websiteLogo={tool.websiteLogo || ""}
        name={tool.name ?? ""}
        size="lg"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-medium text-foreground">
          {tool.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
          {tool.whatIsSummary || tool.description || "설명이 없습니다"}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className={pricing.className}>{pricing.text}</span>
          {tool.extension?.userNumRaw && (
            <span className="flex items-center text-xs font-light text-muted-foreground-secondary">
              <User2 className="inline h-4 w-4" />
              <span>{tool.extension.userNum} 사용자</span>
            </span>
          )}
          {!tool.extension && tool.monthlyUsers?.count > 0 && (
            <span className="space-x-1 text-xs font-light text-muted-foreground-secondary">
              <TrendingUp className="inline h-4 w-4" />
              <span className="text-muted-foreground-secondary">
                {tool.monthlyUsers.formatted}
              </span>
            </span>
          )}
        </div>
      </div>
      <button
        onClick={onRemove}
        className="hover:bg-destructive/10 group flex-shrink-0 rounded-full p-2 transition-colors"
        aria-label={`${tool.name} 제거`}
      >
        <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
      </button>
    </div>
  );
}
