import { SubscriptionToolList } from "@/src/entities/subscription";
import { getUserSubscriptions } from "@/src/entities/subscription/api";
import { EmptyState } from "@/src/features/subscription/ui/EmptyState";
import { SUBSCRIPTION_CATEGORY_PATHNAME } from "@/src/shared/config/pathname";
import { Button } from "@/src/shared/ui";
import { Settings } from "lucide-react";
import Link from "next/link";

// Mock 데이터: 구독한 카테고리(writing, design)의 도구들만 표시
// TODO: 실제로는 서버에서 getUserSubscribedTools(userId) 같은 API로 받아올 예정
const subscribedTools = [
  {
    id: 2,
    name: "ChatGPT",
    category: "대화형 AI",
    categoryId: "writing",
    rating: 4.8,
    description:
      "자연어 처리 기반의 대화형 AI로 질문 답변, 텍스트 생성, 번역 등 다양한 작업을 수행할 수 있습니다.",
    price: "$20/월부터",
    date: "2025.01.02",
    reviewCount: 10,
  },
  {
    id: 5,
    name: "Claude",
    category: "대화형 AI",
    categoryId: "writing",
    rating: 4.6,
    description: "Anthropic에서 개발한 안전하고 유용한 AI 어시스턴트입니다.",
    price: "$20/월부터",
    date: "2025.01.05",
    reviewCount: 9,
  },
  {
    id: 8,
    name: "Grammarly",
    category: "글쓰기",
    categoryId: "writing",
    rating: 4.5,
    description: "AI 기반 영어 문법 검사기 및 글쓰기 개선 도구입니다.",
    price: "$12/월부터",
    date: "2025.01.08",
    reviewCount: 18,
  },
  // Design 카테고리 도구들
  {
    id: 1,
    name: "Midjourney",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.6,
    description:
      "텍스트 프롬프트를 통해 고품질의 예술적 이미지를 생성하는 AI 도구입니다.",
    price: "$10~60/월부터",
    date: "2025.01.01",
    reviewCount: 3,
  },
  {
    id: 6,
    name: "Canva AI",
    category: "디자인",
    categoryId: "design",
    rating: 4.4,
    description:
      "AI 기반 디자인 도구로 로고, 포스터, 소셜미디어 콘텐츠를 쉽게 제작할 수 있습니다.",
    price: "$12.99/월부터",
    date: "2025.01.06",
    reviewCount: 12,
  },
  {
    id: 9,
    name: "DALL-E 3",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.7,
    description:
      "OpenAI의 최신 이미지 생성 AI로 고품질의 창의적인 이미지를 생성합니다.",
    price: "$20/월부터",
    date: "2025.01.09",
    reviewCount: 20,
  },
  {
    id: 10,
    name: "Stable Diffusion",
    category: "이미지 생성",
    categoryId: "design",
    rating: 4.4,
    description:
      "오픈소스 이미지 생성 AI로 다양한 스타일의 이미지를 생성할 수 있습니다.",
    price: "무료",
    date: "2025.01.10",
    reviewCount: 22,
  },
];

export default async function Subscriptions() {
  // 서버에서 유저 구독 상태 조회
  const userSubscriptions = await getUserSubscriptions();
  const hasSubscriptions = userSubscriptions.length > 0;
  return (
    <section>
      <h2 className="hidden">Subscriptions</h2>

      {hasSubscriptions ? (
        <>
          {/* 오른쪽에 설정 링크 */}
          <div className="flex items-end justify-end py-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href={SUBSCRIPTION_CATEGORY_PATHNAME}>
                <Settings className="h-4 w-4" />
                <span>카테고리 구독하기</span>
              </Link>
            </Button>
          </div>

          {/* 구독 도구 리스트 */}
          <SubscriptionToolList subscribedTools={subscribedTools} />
        </>
      ) : (
        /* 구독한 도구가 없을 때 EmptyState */
        <EmptyState />
      )}
    </section>
  );
}
