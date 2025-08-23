import { getToolBySlug } from "@/src/entities/tool";
import { ReviewSideSheet } from "@/src/features/review";

interface ReviewFormProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ReviewForm({ params }: ReviewFormProps) {
  const { slug } = await params;
  const toolData = (await getToolBySlug(slug))!;

  return (
    <ReviewSideSheet toolName={toolData.name || "도구"} toolId={toolData.id} />
  );
}
