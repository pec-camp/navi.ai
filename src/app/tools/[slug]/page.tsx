interface ToolDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ToolDetail({ params }: ToolDetailPageProps) {
  const { slug } = params;

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <h1>Tool Detail</h1>
      <p>Tool: {slug}</p>
    </div>
  );
}