import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown, Phone, Truck, Users, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Freight Services", href: "/freight-shipping-services" },
];

const postDriverLinks = [
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/blog" },
];

const driverLinks = [
  { label: "Owner Operators", href: "/owner-operators", icon: Truck, desc: "Run your own business with our support" },
  { label: "Company Drivers", href: "/company-drivers", icon: Users, desc: "Stable routes & competitive pay" },
  { label: "Fleet Program", href: "/fleet-program", icon: Network, desc: "Scale your fleet with us" },
];

const socialLinks = [
  { icon: "facebook", href: "https://www.facebook.com/xxiicen/" },
  { icon: "instagram", href: "https://www.instagram.com/xxii.trucking?igsh=MTZvbnkwMDZxZGRiaw==" },
  { icon: "linkedin", href: "https://www.linkedin.com/company/xxii-century-inc/" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDriversOpen, setIsDriversOpen] = useState(false);
  const driversRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDriversOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (driversRef.current && !driversRef.current.contains(e.target as Node)) {
        setIsDriversOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isDriverPage = driverLinks.some((l) => location.pathname === l.href);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-2 shadow-2xl border-b border-border/40"
            : "py-4 border-b border-transparent"
        }`}
        style={{
          background: isScrolled
            ? "hsl(222 47% 8% / 0.92)"
            : "linear-gradient(180deg, hsl(222 47% 6% / 0.85) 0%, transparent 100%)",
          backdropFilter: isScrolled ? "blur(20px) saturate(1.5)" : "blur(8px)",
          WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(1.5)" : "blur(8px)",
        }}
      >
        <div className="container-custom flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 logo-shine">
            <img
              src={logo}
              alt="XXII Century"
              className={`w-auto transition-all duration-500 ${isScrolled ? "h-9" : "h-11 md:h-12"}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-[13px] uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap group ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}

            {/* Drivers Dropdown */}
            <div ref={driversRef} className="relative">
              <button
                onClick={() => setIsDriversOpen(!isDriversOpen)}
                onMouseEnter={() => setIsDriversOpen(true)}
                className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-[13px] uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                  isDriverPage
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                Drivers
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isDriversOpen ? "rotate-180" : ""}`}
                />
                {isDriverPage && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {isDriversOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    onMouseLeave={() => setIsDriversOpen(false)}
                  >
                    <div
                      className="w-[280px] rounded-xl p-1.5 shadow-2xl border border-border/60"
                      style={{
                        background: "hsl(222 47% 10% / 0.97)",
                        backdropFilter: "blur(24px)",
                      }}
                    >
                      {driverLinks.map((link) => {
                        const Icon = link.icon;
                        const isLinkActive = location.pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            to={link.href}
                            className={`flex items-start gap-3 px-3 py-3 rounded-lg transition-all duration-200 group/item ${
                              isLinkActive
                                ? "bg-primary/10"
                                : "hover:bg-white/[0.05]"
                            }`}
                          >
                            <div
                              className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                                isLinkActive
                                  ? "bg-primary/20 text-primary"
                                  : "bg-white/[0.06] text-muted-foreground group-hover/item:text-primary group-hover/item:bg-primary/10"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`text-sm font-semibold transition-colors duration-200 ${
                                  isLinkActive
                                    ? "text-primary"
                                    : "text-foreground/90 group-hover/item:text-foreground"
                                }`}
                              >
                                {link.label}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 leading-snug">
                                {link.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}

                      {/* Dropdown CTA */}
                      <div className="border-t border-border/40 mt-1 pt-1 px-1 pb-0.5">
                        <a
                          href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10 transition-colors duration-200"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Post-Driver Nav Links */}
            {postDriverLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 xl:px-4 py-2 rounded-lg font-medium text-[13px] uppercase tracking-[0.08em] transition-all duration-300 whitespace-nowrap group ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: "var(--gradient-primary)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Socials */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+17735725012"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mr-1 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              (773) 572-5012
            </a>

            <Button variant="hero" size="default" className="whitespace-nowrap text-xs h-9" asChild>
              <a
                href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Apply To Drive</span>
              </a>
            </Button>

            {/* Social Icons */}
            <div className="flex items-center gap-1 ml-1">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  {social.icon === "facebook" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-foreground hover:bg-white/[0.06] transition-colors"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: "hsl(222 47% 6% / 0.97)",
                backdropFilter: "blur(24px)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative z-10 flex flex-col min-h-screen pt-20 pb-8 px-8"
            >
              {/* Main Nav Links */}
              <div className="flex-1 flex flex-col justify-center gap-0">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-2 text-lg font-display font-bold uppercase tracking-wider transition-all duration-300 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground/80 hover:text-foreground hover:translate-x-2"
                      }`}
                    >
                      {link.label}
                      {location.pathname === link.href && (
                        <motion.div
                          layoutId="mobile-active"
                          className="h-[2px] w-12 mt-1 rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                {/* Drivers Section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="py-2"
                >
                  <span className="text-lg font-display font-bold uppercase tracking-wider text-foreground/80">
                    Drivers
                  </span>
                  <div className="mt-2 ml-1 flex flex-col gap-0 border-l-2 border-primary/30 pl-4">
                    {driverLinks.map((link, i) => {
                      const Icon = link.icon;
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                        >
                          <Link
                            to={link.href}
                            className={`flex items-center gap-3 py-2 transition-all duration-300 group ${
                              location.pathname === link.href
                                ? "text-primary"
                                : "text-foreground/60 hover:text-foreground hover:translate-x-1"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              location.pathname === link.href
                                ? "bg-primary/20 text-primary"
                                : "bg-white/[0.06] text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold block">{link.label}</span>
                              <span className="text-xs text-muted-foreground">{link.desc}</span>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Post-Driver Links */}
                {postDriverLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-2 text-lg font-display font-bold uppercase tracking-wider transition-all duration-300 ${
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground/80 hover:text-foreground hover:translate-x-2"
                      }`}
                    >
                      {link.label}
                      {location.pathname === link.href && (
                        <motion.div
                          layoutId="mobile-active"
                          className="h-[2px] w-12 mt-1 rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3 mt-6"
              >
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a
                    href="https://intelliapp.driverapponline.com/c/goxxii?r=Eve"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply To Drive
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" className="w-full" asChild>
                  <a href="tel:+17735725012" className="flex items-center justify-center gap-2">
                    <Phone size={18} />
                    (773) 572-5012
                  </a>
                </Button>
              </motion.div>

              {/* Mobile Social */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mt-6"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/50 hover:text-primary hover:border-primary/50 transition-all"
                  >
                    {social.icon === "facebook" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
