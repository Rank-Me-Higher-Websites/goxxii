import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingShapes } from "@/components/FloatingShapes";
import { FloatingCTA } from "@/components/FloatingCTA";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <FloatingShapes />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};
