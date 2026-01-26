import Link from "next/link";
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  // product: [
  //   { href: "#features", label: "Features" },
  //   { href: "#how-it-works", label: "How It Works" },
  //   { href: "#faq", label: "FAQ" },
  // ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    // { href: "/careers", label: "Careers" },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    // { href: "/privacy", label: "Privacy Policy" },
    // { href: "/cookies", label: "Cookie Policy" },
  ],
};

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1E0E62]">Live Market</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              The all-in-one platform for live commerce sellers. Stream, sell, and grow your business.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-[#1E0E62]"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1E0E62]">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#1E0E62]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#1E0E62]">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[#1E0E62]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Live Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
