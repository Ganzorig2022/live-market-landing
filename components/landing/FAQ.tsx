"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Live Market?",
    answer:
      "Live Market is an all-in-one platform for live commerce sellers. It allows you to stream live to your audience, manage products and inventory, process orders, and grow your business with powerful analytics tools.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Signing up is easy! Click the 'Get Started' button, fill in your business information, verify your email with an OTP code, and sign the terms agreement. Your account will be reviewed by our team.",
  },
  {
    question: "How long does approval take?",
    answer:
      "Most accounts are reviewed within 24-48 hours. Once approved, you'll receive an email with your login credentials and can start setting up your shop immediately.",
  },
  {
    question: "Is there a fee to use the platform?",
    answer:
      "We offer a free tier for small sellers to get started. As your business grows, we have affordable plans with additional features. You only pay a small commission on successful sales.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We support multiple payment methods including credit/debit cards, bank transfers, and popular digital wallets. All payments are processed securely with fraud protection.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team via email at support@livemarket.com or through the in-app chat. We typically respond within a few hours during business days.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1E0E62] sm:text-4xl">
            Frequently asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white shadow-sm">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-base font-medium pr-4 text-[#1E0E62]">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
