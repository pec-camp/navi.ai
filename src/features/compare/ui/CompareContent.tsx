"use client";

import { ArrowRight,Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatToolDetail } from "@/entities/tool";
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

import { useCompare } from "../model";

interface CompareContentProps {
  onClose: () => void;
}

export default function CompareContent({ onClose }: CompareContentProps) {
  const { items, removeFromCompare, clearCompare, canCompare } = useCompare();
  const [showClearDialog, setShowClearDialog] = useState(false);
  const router = useRouter();
  
  const handleCompare = () => {
    if (!canCompare) {
      console.log('Cannot compare - need at least 2 items');
      return;
    }
    
    const toolSlugs = items
      .map(item => item.tool.slug)
      .filter(slug => slug && slug !== '')
      .join(',');
    
    if (toolSlugs) {
      const url = `/compare-result?tools=${toolSlugs}`;
      console.log('Navigating to:', url);
      
      // Close the sheet (this will set the navigation flag)
      onClose();
      
      // Navigate immediately
      router.push(url);
    } else {
      console.error('No valid slugs found in items:', items);
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
              <h2 className="text-xl font-semibold text-foreground">비교할 도구</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                최대 3개까지 선택 가능 ({items.length}/3)
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-muted transition-colors"
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
          <div className="mt-auto border-t border-border bg-background/95">
            <div className="px-6 py-5 space-y-3">
              <Button 
                type="button"
                onClick={handleCompare}
                disabled={!canCompare}
                className="w-full h-12 text-base font-medium shadow-sm"
                size="lg"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                {canCompare ? `${items.length}개 도구 비교하기` : '최소 2개 이상 선택하세요'}
              </Button>
              
              <button 
                onClick={() => setShowClearDialog(true)}
                className="w-full py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-md transition-all duration-200"
              >
                <Trash2 className="inline mr-1.5 h-4 w-4" />
                전체 삭제
              </button>
            </div>
          </div>
        )}
      </div>
      
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
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
    </>
  );
}

interface CompareToolCardProps {
  tool: ReturnType<typeof formatToolDetail>;
  onRemove: () => void;
}

function CompareToolCard({ tool, onRemove }: CompareToolCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <ToolLogo 
        websiteLogo={tool.websiteLogo || ""}
        name={tool.name ?? ""}
        size="lg" 
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate text-base">{tool.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {tool.whatIsSummary || tool.description || "설명이 없습니다"}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
            {tool.isFree ? '🆓 무료' : '💰 유료'}
          </span>
          {tool.extension?.userNumRaw && (
            <span className="text-xs text-muted-foreground">
              👥 {tool.extension.userNum} 사용자
            </span>
          )}
          {!tool.extension && tool.monthlyUsers?.count > 0 && (
            <span className="text-xs text-muted-foreground">
              📊 {tool.monthlyUsers.formatted} 월간 방문
            </span>
          )}
        </div>
      </div>
      <button 
        onClick={onRemove}
        className="rounded-full p-2 hover:bg-destructive/10 transition-colors group flex-shrink-0"
        aria-label={`${tool.name} 제거`}
      >
        <X className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
      </button>
    </div>
  );
}