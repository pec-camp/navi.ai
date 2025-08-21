"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { deleteAccount } from "../action/delete-account";

export function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      const result = await deleteAccount();
      if (result?.error) {
        setError(result.error);
        setIsDeleting(false);
      }
    } catch {
      setError("계정 삭제 중 오류가 발생했습니다.");
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setConfirmText("");
    setError(null);
  };

  return (
    <>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900">계정 삭제</h3>
              <p className="mt-1 text-sm text-red-700">
                계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              </p>
              <Button
                variant="destructive"
                size="sm"
                className="mt-3 inline-flex items-center gap-1.5"
                onClick={() => setIsOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                <span>계정 삭제</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">계정을 삭제하시겠습니까?</DialogTitle>
            <DialogDescription className="space-y-3 pt-3">
              <p>이 작업은 되돌릴 수 없습니다. 계정을 삭제하면:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>모든 프로필 정보가 삭제됩니다</li>
                <li>저장된 설정이 모두 사라집니다</li>
                <li>더 이상 서비스를 이용할 수 없습니다</li>
              </ul>
              <div className="pt-3">
                <label htmlFor="confirm" className="text-sm font-medium">
                  계속하려면 <span className="font-bold text-red-600">DELETE</span>를 입력하세요:
                </label>
                <input
                  id="confirm"
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="DELETE"
                />
              </div>
              {error && (
                <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                  {error}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmText !== "DELETE" || isDeleting}
            >
              {isDeleting ? "삭제 중..." : "계정 삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}