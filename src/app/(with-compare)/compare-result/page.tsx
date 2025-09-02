import { ArrowLeft, Home, ListPlus } from "lucide-react";
import Link from "next/link";

import { CompareTable } from "@/features/compare";
import { Button } from "@/shared/ui/button";

export default async function CompareResultPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="w-full px-6 py-12">
        <div className="mx-auto max-w-[1600px]">
          {/* Navigation buttons */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex gap-3">
              <Button variant="outline" size="lg" asChild>
                <Link href="/tools">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  도구 목록으로
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  홈으로
                </Link>
              </Button>
            </div>

            <Button variant="default" size="lg" asChild>
              <Link href="/tools?compare=open">
                <ListPlus className="mr-2 h-5 w-5" />
                다시 비교하기
              </Link>
            </Button>
          </div>

          <div className="mb-10">
            <h1 className="mb-3 text-4xl font-bold text-foreground">
              AI 도구 비교
            </h1>
            <p className="text-lg text-muted-foreground">
              선택한 도구들의 상세 기능을 비교해보세요
            </p>
          </div>

          <CompareTable />
        </div>
      </div>
    </main>
  );
}
