"use client";

import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import DeleteReviewDialog from "./DeleteReviewDialog";

interface ReviewActionsProps {
  reviewId: number;
  toolSlug: string;
  currentUserId?: string;
  reviewUserId: string;
}

export default function ReviewActions({
  reviewId,
  toolSlug,
  currentUserId,
  reviewUserId,
}: ReviewActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 본인 리뷰가 아니면 아무것도 렌더링하지 않음
  if (!currentUserId || currentUserId !== reviewUserId) {
    return null;
  }

  const editUrl = `/tools/${toolSlug}/reviews/review-form?mode=edit&id=${reviewId}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">리뷰 액션</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={editUrl} className="flex items-center gap-2">
              <Edit2 className="h-4 w-4" />
              수정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteReviewDialog
        reviewId={reviewId}
        isOpen={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  );
}
