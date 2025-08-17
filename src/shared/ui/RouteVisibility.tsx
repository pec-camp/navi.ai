'use client';

import { usePathname } from 'next/navigation';

interface RouteVisibilityProps {
  hideOn?: string[];
  children: React.ReactNode;
}

export default function RouteVisibility({ hideOn = [], children }: RouteVisibilityProps) {
  const pathname = usePathname();
  const shouldHide = hideOn.some((prefix) => pathname?.startsWith(prefix));
  if (shouldHide) return null;
  return <>{children}</>;
}


