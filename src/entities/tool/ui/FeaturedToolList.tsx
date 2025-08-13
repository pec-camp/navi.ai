import { FeaturedToolCard } from "./FeaturedToolCard";

const featuredTools = [
  {
    title: "ChatGPT",
    description:
      "자연어 처리 기반의 대화형 AI로 질문 답변, 텍스트 생성, 번역 등 다양한 작업을 수행할 수 있습니다.",
    imageUrl: "/logo.webp",
    tags: ["대화형 AI", "글쓰기", "분석"],
  },
  {
    title: "Midjourney",
    description:
      "텍스트 프롬프트를 통해 고품질의 예술적 이미지를 생성하는 AI 도구입니다.",
    imageUrl: "/logo.webp",
    tags: ["이미지 생성", "아트", "디자인"],
  },
  {
    title: "Notion AI",
    description:
      "Notion 워크스페이스에 통합된 AI로 노트 정리, 문서 작성, 아이디어 정리를 도와줍니다.",
    imageUrl: "/logo.webp",
    tags: ["생산성", "글쓰기", "정리"],
  },
  {
    title: "GitHub Copilot",
    description:
      "개발자를 위한 AI 페어 프로그래밍 도구로 코드 자동완성과 제안을 제공합니다.",
    imageUrl: "/logo.webp",
    tags: ["코딩", "개발", "AI 어시스턴트"],
  },
  {
    title: "Claude",
    description: "Anthropic에서 개발한 안전하고 유용한 AI 어시스턴트입니다.",
    imageUrl: "/logo.webp",
    tags: ["대화형 AI", "분석", "글쓰기"],
  },
  {
    title: "Canva AI",
    description:
      "AI 기반 디자인 도구로 로고, 포스터, 소셜미디어 콘텐츠를 쉽게 제작할 수 있습니다.",
    imageUrl: "/logo.webp",
    tags: ["디자인", "이미지 생성", "마케팅"],
  },
  {
    title: "Jasper AI",
    description: "마케팅 콘텐츠와 광고 카피를 위한 전문 AI 라이팅 도구입니다.",
    imageUrl: "/logo.webp",
    tags: ["마케팅", "글쓰기", "SEO"],
  },
  {
    title: "Grammarly",
    description: "AI 기반 영어 문법 검사기 및 글쓰기 개선 도구입니다.",
    imageUrl: "/logo.webp",
    tags: ["글쓰기", "문법", "교정"],
  },
  {
    title: "Canva AI",
    description:
      "AI 기반 디자인 도구로 로고, 포스터, 소셜미디어 콘텐츠를 쉽게 제작할 수 있습니다.",
    imageUrl: "/logo.webp",
    tags: ["디자인", "이미지 생성", "마케팅"],
  },
  {
    title: "Jasper AI",
    description: "마케팅 콘텐츠와 광고 카피를 위한 전문 AI 라이팅 도구입니다.",
    imageUrl: "/logo.webp",
    tags: ["마케팅", "글쓰기", "SEO"],
  },
  {
    title: "Grammarly",
    description: "AI 기반 영어 문법 검사기 및 글쓰기 개선 도구입니다.",
    imageUrl: "/logo.webp",
    tags: ["글쓰기", "문법", "교정"],
  },
  {
    title: "Canva AI",
    description:
      "AI 기반 디자인 도구로 로고, 포스터, 소셜미디어 콘텐츠를 쉽게 제작할 수 있습니다.",
    imageUrl: "/logo.webp",
    tags: ["디자인", "이미지 생성", "마케팅"],
  },
];

export default function FeaturedToolList() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {featuredTools.map((tool, index) => (
        <FeaturedToolCard
          key={index}
          title={tool.title}
          description={tool.description}
          imageUrl={tool.imageUrl}
          tags={tool.tags}
          className="h-full"
        />
      ))}
    </div>
  );
}
