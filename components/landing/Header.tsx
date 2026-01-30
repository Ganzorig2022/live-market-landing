"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Боломжууд" },
  { href: "#how-it-works", label: "Хэрхэн ажилладаг" },
  { href: "#faq", label: "Түгээмэл асуултууд" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-6 lg:px-8">
      <nav className="container mx-auto bg-white rounded-[2rem] shadow-sm border border-border px-6 py-3 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Live Market" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Үндсэн цэсийг нээх</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="container mx-auto mt-2 bg-white rounded-3xl shadow-sm border border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full rounded-full">
                <Link href="/login">Нэвтрэх</Link>
              </Button>
              <Button asChild className="w-full bg-primary hover:bg-primary-hover rounded-full">
                <Link href="/signup">Худалдаа эхлүүлэх</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
