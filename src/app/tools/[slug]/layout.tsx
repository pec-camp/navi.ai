export default function ToolsLayout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {sheet}
    </div>
  );
}
