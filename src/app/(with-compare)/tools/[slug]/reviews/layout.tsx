interface ReviewsLayoutProps {
  children: React.ReactNode;
  sheet: React.ReactNode;
}

export default function ReviewsLayout({ children, sheet }: ReviewsLayoutProps) {
  return (
    <div className="relative">
      {children}
      {sheet}
    </div>
  );
}
