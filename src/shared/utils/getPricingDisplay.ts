export const getPricingDisplay = (isFree: boolean, PricingPlan: string) => {
  if (isFree)
    return {
      text: "무료",
      badge: true,
      className:
        "inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800",
    };

  return {
    text: PricingPlan,
    badge: false,
    className: "text-xs font-light text-muted-foreground-secondary",
  };
};
