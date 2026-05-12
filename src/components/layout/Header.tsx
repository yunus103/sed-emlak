"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import {
  RiMenu3Line, RiCloseLine, RiArrowDownSLine,
  RiArrowRightSLine, RiPhoneLine, RiMailLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  subLinks?: NavItem[];
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Header({ settings, navigation }: { settings: any; navigation: any }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links: NavItem[] = navigation?.headerLinks || [];
  const phone = settings?.contactInfo?.phone;
  const email = settings?.contactInfo?.email;

  // Pathname değişince menüyü kapat
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Scroll efekti
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll kilit
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (item: NavItem) => {
    const href = resolveHref(item);
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/98 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-white/95 backdrop-blur-sm border-b border-border/50"
        )}
        style={{ height: "var(--header-height)" }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full group shrink-0 py-2">
            <div
              className="relative"
              style={{ height: "4.5rem", minWidth: "120px", maxWidth: "340px", width: "auto" }}
            >
              {settings?.logo ? (
                <SanityImage
                  image={settings.logo}
                  fill
                  objectFit="contain"
                  fit="max"
                  className="!object-left transition-opacity duration-200 group-hover:opacity-75"
                  sizes="320px"
                  priority
                  noBlur
                />
              ) : (
                <span className="font-bold text-2xl tracking-tight leading-none">
                  {settings?.siteName}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-end">
            {links.map((item, i) => (
              <DesktopNavItem key={i} item={item} active={isActive(item)} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors text-foreground shrink-0"
          >
            <RiMenu3Line size={23} />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel — FULL SCREEN & CENTERED */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-full w-full bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 border-b border-border/40" style={{ height: "var(--header-height)" }}>
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center">
                  <div className="relative" style={{ height: "2.5rem", minWidth: "80px", maxWidth: "160px" }}>
                    {settings?.logo ? (
                      <SanityImage
                        image={settings.logo}
                        fill
                        objectFit="contain"
                        fit="max"
                        className="!object-left"
                        sizes="160px"
                        noBlur
                      />
                    ) : (
                      <span className="font-bold text-lg">{settings?.siteName}</span>
                    )}
                  </div>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Menüyü kapat"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors text-foreground"
                >
                  <RiCloseLine size={26} />
                </button>
              </div>

              {/* Nav Links — Centered Content */}
              <nav className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-10 px-6 space-y-2">
                {links.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    className="w-full max-w-xs"
                  >
                    <MobileNavItem
                      item={item}
                      isActive={isActive(item)}
                      onClose={() => setMenuOpen(false)}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer — Centered contact */}
              {(phone || email) && (
                <div className="px-6 py-8 border-t border-border/40 bg-muted/20 flex flex-col items-center gap-4">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-3 text-base text-foreground/80 hover:text-primary transition-colors"
                    >
                      <RiPhoneLine size={18} className="text-primary" />
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-base text-foreground/80 hover:text-primary transition-colors"
                    >
                      <RiMailLine size={18} className="text-primary" />
                      {email}
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop nav item ──────────────────────────────────────────────────────── */
function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSubActive = item.subLinks?.some((sub) => pathname === resolveHref(sub));
  const reallyActive = active || isSubActive;

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  const linkCls = cn(
    "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap select-none",
    "after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:transition-transform after:duration-200 after:origin-left",
    reallyActive
      ? "text-foreground after:bg-foreground after:scale-x-100"
      : "text-foreground/60 hover:text-foreground after:bg-foreground after:scale-x-0 hover:after:scale-x-100"
  );

  if (!item.subLinks?.length) {
    return (
      <Link
        href={resolveHref(item)}
        target={item.openInNewTab ? "_blank" : undefined}
        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
        className={linkCls}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button className={linkCls}>
        {item.label}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="opacity-50 shrink-0"
        >
          <RiArrowDownSLine size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            onMouseEnter={open}
            onMouseLeave={close}
            className="absolute left-0 top-full pt-2 min-w-[210px] z-50"
          >
            <div className="bg-white border border-border/60 rounded-xl shadow-xl overflow-hidden p-1.5">
              {item.subLinks!.map((sub, j) => {
                const subActive = pathname === resolveHref(sub);
                return (
                  <Link
                    key={j}
                    href={resolveHref(sub)}
                    target={sub.openInNewTab ? "_blank" : undefined}
                    rel={sub.openInNewTab ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center px-3.5 py-2.5 text-sm rounded-lg transition-colors",
                      subActive
                        ? "text-foreground font-semibold bg-muted"
                        : "text-foreground/65 hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile nav item (drawer) ─────────────────────────────────────────────── */
function MobileNavItem({
  item,
  isActive,
  onClose,
}: {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [subOpen, setSubOpen] = useState(false);
  const hasSubLinks = !!item.subLinks?.length;

  return (
    <div className="mb-2">
      <div className="flex flex-col items-center justify-center">
        <Link
          href={resolveHref(item)}
          onClick={!hasSubLinks ? onClose : undefined}
          className={cn(
            "w-full text-center py-4 text-2xl font-semibold transition-all duration-300",
            isActive
              ? "text-primary scale-110"
              : "text-foreground/80 hover:text-primary"
          )}
        >
          {item.label}
        </Link>
        {hasSubLinks && (
          <button
            onClick={() => setSubOpen((v) => !v)}
            className={cn(
              "flex items-center justify-center gap-1 mt-1 text-sm font-medium transition-colors",
              subOpen ? "text-primary" : "text-foreground/40 hover:text-foreground"
            )}
          >
            {subOpen ? "Kapat" : "Alt Linkler"}
            <motion.span
              animate={{ rotate: subOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <RiArrowDownSLine size={16} />
            </motion.span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasSubLinks && subOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center pt-4 pb-4 gap-4">
              {item.subLinks!.map((sub, j) => (
                <Link
                  key={j}
                  href={resolveHref(sub)}
                  onClick={onClose}
                  className={cn(
                    "text-lg transition-colors",
                    pathname === resolveHref(sub)
                      ? "text-primary font-bold"
                      : "text-foreground/60 hover:text-primary"
                  )}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
