import { ReactNode } from "react";

interface SubscriptionsLayoutProps {
  children: ReactNode;
}

export default function SubscriptionsLayout({
  children,
}: SubscriptionsLayoutProps) {
  return (
    <div className="flex flex-col">
      {children}
    </div>
  );
}
