"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Her rota değişikliğinde pencereyi en üste kaydırır.
 * Layout'a mount edilir — herhangi bir UI render etmez.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
