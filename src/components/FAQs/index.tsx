"use client";

import { useState } from "react";
import type { Tool } from "@/types/tools";

interface FAQsProps {
  tool: Tool;
}

export default function FAQs({ tool }: FAQsProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  if (!tool.faqs || tool.faqs.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-6">
        Frequently asked questions about {tool.tool_name}
      </h2>
      <div className="space-y-0 border-t border-gray-200">
        {tool.faqs.map((faq) => (
          <div key={faq._id} className="border-b border-gray-200">
            <button
              onClick={() => toggleFaq(faq._id)}
              className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedFaq === faq._id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeCap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {expandedFaq === faq._id && (
              <div className="pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

