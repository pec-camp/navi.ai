import {
  CompareFAB,
  CompareProvider,
  CompareSideSheet,
} from "@/features/compare";

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <CompareProvider>
        {children}
        <CompareFAB />
        <CompareSideSheet />
      </CompareProvider>
    </div>
  );
}
