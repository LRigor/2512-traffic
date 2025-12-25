"use client";

import { useState } from "react";

interface UseCase {
  role: string;
  description: string;
}

const useCases: UseCase[] = [
  {
    role: "Project Managers",
    description: "Organizing and scheduling tasks for team members.",
  },
  {
    role: "Content Creators",
    description: "Generating high-quality content ideas and drafts.",
  },
  {
    role: "Data Analysts",
    description:
      "Analyzing complex datasets to retrieve actionable insights.",
  },
  {
    role: "Customer Support Teams",
    description: "Automating responses to common customer inquiries.",
  },
  {
    role: "Marketing Teams",
    description:
      "Creating targeted marketing campaigns and analyzing their effectiveness.",
  },
  {
    role: "Freelancers",
    description: "Managing multiple projects and deadlines efficiently.",
  },
  {
    role: "HR Professionals",
    description: "Screening and managing job applications.",
  },
  {
    role: "Small Business Owners",
    description: "Automating everyday business tasks to save time.",
  },
];

export default function UseCases() {
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);

  const toggleUseCase = (useCase: string) => {
    setExpandedUseCase(expandedUseCase === useCase ? null : useCase);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-6">Use Cases</h2>
      <div className="space-y-0 border-t border-gray-200">
        {useCases.map((useCase, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleUseCase(useCase.role)}
              className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-blue-600">
                {useCase.role}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedUseCase === useCase.role ? "rotate-180" : ""
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
            {expandedUseCase === useCase.role && (
              <div className="pb-4 text-gray-600">{useCase.description}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

