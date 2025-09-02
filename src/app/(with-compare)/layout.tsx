import { CompareFAB, CompareProvider } from "@/features/compare";
import { CompareClientWrapper } from "@/features/compare/ui/CompareClientWrapper";

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <CompareProvider>
        {children}
        <CompareFAB />
        <CompareClientWrapper />
      </CompareProvider>
    </div>
  );
}
