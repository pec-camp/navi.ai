import Image from "next/image";

import logoSrc from "@/public/logo.webp";

export const Logo = () => {
  return <Image src={logoSrc} width={40} height={40} alt="logo" />;
};
