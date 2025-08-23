import { Plus } from "lucide-react";
import { notFound } from "next/navigation";

import { getToolBySlug } from "@/src/entities/tool";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shared/ui/accordion";

interface ToolFAQPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolFAQPage({ params }: ToolFAQPageProps) {
  const { slug } = await params;

  const toolData = await getToolBySlug(slug);

  if (!toolData) {
    notFound();
  }

  const aiContent = toolData.content;
  const faqData = aiContent?.faq || [];

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <h2 className="text-xl font-medium capitalize text-secondary">
        {toolData.name} 자주 묻는 질문
      </h2>

      {/* FAQ 섹션 */}
      <div className="space-y-6">
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="rounded-2xl border border-border bg-background"
            >
              <AccordionTrigger className="hover:bg-accent/50 group px-6 py-6 text-base font-medium leading-7 tracking-[-0.16px] text-foreground hover:no-underline [&>svg]:hidden">
                {item.q}
                <div className="group-hover:bg-foreground/90 ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-foreground transition-colors duration-200">
                  <Plus
                    className="h-4 w-4 text-background transition-transform duration-200 group-data-[state=open]:rotate-45"
                    strokeWidth={2.5}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-border px-6 pb-6 pt-4">
                <p className="text-base font-light leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ가 없는 경우 메시지 */}
      {faqData.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">아직 등록된 FAQ가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
