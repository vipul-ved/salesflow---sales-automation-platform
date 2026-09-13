"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, Play, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing & ROI", href: "/pricing" },
    { label: "Compare vs CRM", href: "/compare" },
    { label: "Integrations", href: "/integrations" },
    { label: "Customers", href: "/customers" },
  ];

  const handleInstantSandbox = async () => {
    setLoadingDemo(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "alex@acme.com", password: "password123" }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    } finally {
      setLoadingDemo(false);
    }
  };

  return (
    <header className="border-b border-gray-800/80 bg-[#080b11]/80 backdrop-blur-md fixed top-0 w-full z-50 px-4 md:px-8 h-16 flex items-center justify-between">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg blue-glow">
          SF
        </div>
        <span className="font-extrabold text-white tracking-wide text-base">SalesFlow AI</span>
      </Link>

      {/* Desktop Links */}
      <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-gray-300">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all hover:text-white ${
                isActive ? "text-blue-400 font-semibold border-b-2 border-blue-500 pb-0.5" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right CTAs */}
      <div className="hidden sm:flex items-center space-x-3">
        {/* Instant Sandbox Launch Button */}
        <button
          onClick={handleInstantSandbox}
          disabled={loadingDemo}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-purple-300 border border-purple-500/40 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-purple-300" />
          <span>{loadingDemo ? "Launching..." : "Instant Demo Sandbox"}</span>
        </button>

        <Link href="/login" className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2">
          Sign In
        </Link>

        <Link
          href="/register"
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all flex items-center space-x-1"
        >
          <span>Start Free</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mobile Hamburger Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-gray-950 border-b border-gray-800 p-5 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${pathname === link.href ? "text-blue-400 font-bold" : "text-gray-300"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-gray-800 flex flex-col space-y-2">
            <button
              onClick={handleInstantSandbox}
              className="w-full bg-purple-600/20 text-purple-300 border border-purple-500/40 text-xs font-semibold py-2 rounded-xl"
            >
              Instant Demo Sandbox
            </button>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
