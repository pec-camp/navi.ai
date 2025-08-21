export default async function ReviewForm() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <h1 className="text-2xl font-medium">리뷰 작성</h1>
      <p className="text-foreground/60 text-sm">
        도구에 대한 상세한 리뷰를 작성해주세요.
      </p>
    </div>
  );
}
