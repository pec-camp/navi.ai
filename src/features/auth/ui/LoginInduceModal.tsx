"use client";

import { Lock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { GoogleLoginButton } from "./GoogleLoginButton";
import { KakaoLoginButton } from "./KakaoLoginButton";

interface LoginInduceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export default function LoginInduceModal({
  open,
  onOpenChange,
  title = "로그인하고 계속하기",
  description = "소셜 계정으로 3초만에 시작할 수 있어요.",
}: LoginInduceModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2 text-center font-light">
          {description}
        </DialogDescription>
        <DialogFooter className="flex w-full gap-2 pt-4 sm:flex-col">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
