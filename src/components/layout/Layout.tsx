import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingShapes } from "@/components/FloatingShapes";
import { FloatingCTA } from "@/components/FloatingCTA";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";

interface LayoutProps {
  children: ReactNode;
  onApplyClick?: () => void;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingShapes />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      {/* Spacer so fixed mobile CTA doesn't cover content */}
      <div className="h-28 lg:hidden" aria-hidden />
      <FloatingCTA />
      <FloatingContactButtons />
    </div>
  );
};
