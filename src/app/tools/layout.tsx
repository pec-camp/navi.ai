import { CompareFAB, CompareSideSheet } from "@/features/compare";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      <CompareFAB />
      <CompareSideSheet />
    </div>
  );
}