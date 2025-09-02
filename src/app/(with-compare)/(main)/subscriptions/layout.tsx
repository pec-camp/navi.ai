import { ReactNode } from "react";

interface SubscriptionsLayoutProps {
  children: ReactNode;
  sheet: ReactNode;
}

export default function SubscriptionsLayout({
  children,
  sheet,
}: SubscriptionsLayoutProps) {
  return (
    <div className="flex flex-col">
      {children}
      {sheet}
    </div>
  );
}
