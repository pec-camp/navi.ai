"use client";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  asButton?: boolean; // 새로운 prop 추가
}

export const ExternalLink = ({
  href,
  children,
  asButton = false,
}: ExternalLinkProps) => {
  if (asButton) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          href && window.open(href, "_blank", "noopener,noreferrer");
        }}
        aria-label="외부 사이트로 이동"
      >
        {children}
      </button>
    );
  }

  return (
    <a
      className="hover:underline"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
