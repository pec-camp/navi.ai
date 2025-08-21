"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { OnboardingTool } from "@/features/onboarding/model/onboarding.types";
import JobRoleSelector from "@/features/onboarding/ui/JobRoleSelector";
import ToolSelector from "@/features/onboarding/ui/ToolSelector";
import { Button } from "@/shared/ui/button";

interface OnboardingStepsProps {
  tools: OnboardingTool[];
}

export default function OnboardingSteps({ tools }: OnboardingStepsProps) {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedToolNames, setSelectedToolNames] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isFirstStep = step === 1;
  const isLastStep = step === 2;

  const handleNext = () => setStep((s: number) => Math.min(2, s + 1));
  const handlePrev = () => setStep((s: number) => Math.max(1, s - 1));

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
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
      // Use the redirect path from the response, or default to home
      router.replace(data.redirect || "/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
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
              <Button onClick={handleComplete} disabled={!selectedRole || isSubmitting}>
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
