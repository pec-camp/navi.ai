"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import { OnboardingTool } from "@/features/onboarding/model/onboarding.types";
import JobRoleSelector from "@/features/onboarding/ui/JobRoleSelector";
import ToolSelector from "@/features/onboarding/ui/ToolSelector";
import { Button } from "@/shared/ui/button";

interface OnboardingStepsProps {
  tools: OnboardingTool[];
}

export default function OnboardingSteps({ tools }: OnboardingStepsProps) {
  const router = useRouter();
  const [step, setStep] = React.useState<number>(1);
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const [selectedToolNames, setSelectedToolNames] = React.useState<string[]>([]);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const isFirstStep = step === 1;
  const isLastStep = step === 2;

  const handleNext = () => setStep((s: number) => Math.min(2, s + 1));
  const handlePrev = () => setStep((s: number) => Math.max(1, s - 1));

  const handleComplete = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole, tools: selectedToolNames }),
      });
      const data = await res.json();
      if (!data?.ok) {
        setError(data?.message ?? "저장에 실패했어요. 잠시 후 다시 시도해주세요.");
        return;
      }
      router.replace("/");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-1/2 rounded-full ${isFirstStep ? "bg-primary" : "bg-primary/40"}`}
        />
        <div
          className={`h-2 w-1/2 rounded-full ${isLastStep ? "bg-primary" : "bg-primary/20"}`}
        />
      </div>

      <>
          {isFirstStep ? (
            <JobRoleSelector value={selectedRole} onChange={setSelectedRole} />
          ) : (
            <ToolSelector
              tools={tools}
              selectedTools={selectedToolNames}
              onChange={setSelectedToolNames}
            />
          )}

          <div className={`mt-6 flex items-center ${isFirstStep ? "justify-end" : "justify-between"}`}>
            {!isFirstStep && (
              <Button variant="ghost" onClick={handlePrev}>
                이전
              </Button>
            )}
            {isLastStep ? (
              <Button onClick={handleComplete} disabled={!selectedRole || submitting}>
                완료
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!selectedRole}>
                다음
              </Button>
            )}
          </div>
          {error ? (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          ) : null}
      </>
    </div>
  );
}
