"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { deleteReview } from "../action/deleteReview";

interface DeleteReviewDialogProps {
  reviewId: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteReviewDialog({
  reviewId,
  isOpen,
  onOpenChange,
}: DeleteReviewDialogProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteReview(reviewId);

        if (result.success) {
          onOpenChange(false);
          router.refresh(); // 페이지 새로고침으로 삭제된 리뷰 반영
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error("Delete review error:", error);
        setError("리뷰 삭제 중 오류가 발생했습니다.");
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!isPending) {
      onOpenChange(open);
      if (!open) {
        setError(null); // 다이얼로그 닫을 때 에러 초기화
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-4">리뷰 삭제</DialogTitle>
          <DialogDescription className="font-light leading-5">
            정말로 이 리뷰를 삭제하시겠습니까?
            <br />
            삭제된 리뷰는 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
