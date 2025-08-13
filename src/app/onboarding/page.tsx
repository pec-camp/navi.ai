import { OnboardingTool } from "@/features/onboarding/model/onboarding.types";
import OnboardingSteps from "@/features/onboarding/ui/OnboardingSteps";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default async function Onboarding() {
  const tools: OnboardingTool[] = [
    { key: "chatgpt", name: "ChatGPT" },
    { key: "claude", name: "Claude" },
    { key: "gemini", name: "Gemini" },
    { key: "copilot", name: "GitHub Copilot" },
    { key: "cursor", name: "Cursor" },
    { key: "tabnine", name: "Tabnine" },
    { key: "perplexity", name: "Perplexity" },
    { key: "midjourney", name: "Midjourney" },
    { key: "stable-diffusion", name: "Stable Diffusion" },
    { key: "runway", name: "Runway" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">온보딩</CardTitle>
        </CardHeader>
        <CardContent>
          <OnboardingSteps tools={tools} />
        </CardContent>
      </Card>
    </div>
  );
}