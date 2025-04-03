import Image from "next/image";

import logoSrc from "@/public/logo.webp";

export const Logo = () => {
  return (
    <Image
      className="rounded-md"
      src={logoSrc}
      width={32}
      height={32}
      alt="logo"
    />
  );
};
