"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { LOGIN_PATHNAME } from "@/shared/config/pathname";

interface LoginInduceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export default function LoginInduceModal({
  open,
  onOpenChange,
  title = "로그인이 필요합니다",
  description = "이 기능을 사용하려면 로그인이 필요합니다. 로그인하시겠습니까?",
}: LoginInduceModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    onOpenChange(false);
    router.push(LOGIN_PATHNAME);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleLogin}
          >
            로그인하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
