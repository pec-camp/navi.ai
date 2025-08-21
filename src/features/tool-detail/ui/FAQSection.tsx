import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Plus } from "lucide-react";

export function FAQSection() {
  const faqData = [
    {
      id: "item-1",
      question: "이 AI 도구는 어떤 기능을 제공하나요?",
      answer:
        "이 AI 도구는 텍스트 생성, 이미지 생성, 코드 작성, 번역 등 다양한 AI 기능을 제공합니다. 사용자가 원하는 작업에 따라 맞춤형 결과를 제공합니다.",
    },
    {
      id: "item-2",
      question: "무료로 사용할 수 있나요?",
      answer:
        "기본적인 기능은 무료로 제공되며, 더 고급 기능이나 많은 사용량이 필요한 경우 유료 플랜을 이용하실 수 있습니다.",
    },
    {
      id: "item-3",
      question: "어떤 도구들과 연동이 가능한가요?",
      answer:
        "Google Workspace, Microsoft Office, Slack, Discord 등 다양한 플랫폼과 연동이 가능하며, API를 통해 커스텀 통합도 지원합니다.",
    },
    {
      id: "item-4",
      question: "데이터 보안은 어떻게 보장되나요?",
      answer:
        "모든 데이터는 암호화되어 전송되고 저장되며, GDPR 및 관련 개인정보보호 규정을 준수합니다. 사용자 데이터는 학습에 사용되지 않습니다.",
    },
    {
      id: "item-5",
      question: "어떤 카테고리에 속하는 도구인가요?",
      answer:
        "이 도구는 생산성, 창작, 비즈니스 자동화 카테고리에 속하며, 개인 사용자부터 기업까지 다양한 용도로 활용할 수 있습니다.",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-[-0.48px] text-foreground">
        FAQ
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-2xl border border-border bg-background"
          >
            <AccordionTrigger className="hover:bg-accent/50 group px-6 py-6 text-base font-medium leading-7 tracking-[-0.16px] text-foreground hover:no-underline [&>svg]:hidden">
              {item.question}
              <div className="group-hover:bg-foreground/90 ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-foreground transition-colors duration-200">
                <Plus
                  className="h-4 w-4 text-background transition-transform duration-200 group-data-[state=open]:rotate-45"
                  strokeWidth={2.5}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-border px-6 pb-6 pt-4">
              <p className="text-base font-light leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
