import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

type LogoProps = {
  websiteLogo?: string;
  name: string;
};

type StyleProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

type OptionProps = {
  fallbackText?: string;
};

type ToolLogoProps = LogoProps & StyleProps & OptionProps;

const sizeClasses: Record<NonNullable<ToolLogoProps["size"]>, string> = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

export default function ToolLogo({
  websiteLogo,
  name,
  className = "",
  size = "lg",
  fallbackText,
}: ToolLogoProps) {
  const sizeClass = sizeClasses[size];

  return (
    <Avatar className={`${sizeClass} ${className}`}>
      <AvatarImage src={websiteLogo} alt={name} />
      <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">
        {fallbackText || name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
