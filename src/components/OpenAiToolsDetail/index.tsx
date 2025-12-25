"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import Breadcrumb from "@/components/ui/Breadcrumb";

interface PricingPlan {
  title: string;
  price: number;
  currency: string;
  cost_frequency: string;
  features: string[];
  _id: string;
}

interface Tool {
  id: string;
  tool_name: string;
  headline: string;
  category: string;
  thumbnail_image: string;
  category_slug: string;
  slug: string;
  average_rating: number;
  review_count: number;
  favouriteCount: number;
  features: string[];
  pricing_plans: PricingPlan[];
  last_updated: string;
  tags: string[];
  similar_tools: Array<{ id: string; tool_name: string }>;
  faqs: Array<{ question: string; answer: string; _id: string }>;
  description?: string;
}

interface OpenAiToolsDetailProps {
  tool: Tool;
  allTools?: Tool[];
}

export default function OpenAiToolsDetail({
  tool,
  allTools = [],
}: OpenAiToolsDetailProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const toggleUseCase = (useCase: string) => {
    setExpandedUseCase(expandedUseCase === useCase ? null : useCase);
  };

  // Get similar tools data
  const similarToolsData = tool.similar_tools
    .map((similar) => allTools.find((t) => t.id === similar.id))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 6);

  // Mock use cases based on category
  const useCases = [
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

  // Mock reviews
  const reviews = [
    { name: "Michalka Amalia Deich", avatar: "M", rating: 5 },
    { name: "Pradeep Pradeep", avatar: "P", rating: 5 },
    { name: "Manikandan V", avatar: "MV", rating: 5 },
    { name: "LaRon Scott", avatar: "L", rating: 5 },
    { name: "Nagraj Rao", avatar: "N", rating: 5 },
  ];

  const getAvatarColor = (letter: string) => {
    const colors = [
      "bg-orange-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-red-500",
    ];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  const fullStars = Math.floor(tool.average_rating);
  const hasHalfStar = tool.average_rating % 1 >= 0.5;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: tool.category_slug, href: `/${tool.category_slug}` },
          { label: tool.slug },
        ]}
        className="mb-6"
      />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-black mb-4">
              {tool.tool_name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
                <Image
                  src="/up-arrow-blank.svg"
                  alt="Upvote"
                  width={16}
                  height={16}
                />
                <span className="font-medium text-gray-700">
                  {tool.favouriteCount}
                </span>
              </div>
              <div className="bg-red-100 border border-red-300 text-red-800 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2">
                <Image
                  src="/up-arrow-blank.svg"
                  alt="Upvote"
                  width={14}
                  height={14}
                />
                VOTED TOP TOOL ON OPENTOOLS
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Code
              </button>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Claim Tool
              </Link>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Check out {tool.tool_name}
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Last updated: {formatDate(tool.last_updated, "long")}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <Image
                    key={i}
                    src="/star.svg"
                    alt="Full star"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                ))}
                {hasHalfStar && (
                  <Image
                    src="/star-half.svg"
                    alt="Half star"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                )}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {tool.review_count} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What is [Tool]? Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          What is <span className="text-blue-600">{tool.tool_name}</span>?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {tool.description || tool.headline}
        </p>
        <p className="text-gray-600 text-sm mb-6">
          {tool.tool_name} is a next generation AI assistant built for work and
          trained to be safe, accurate, and secure. BY ANTHROPIC
        </p>
        <div className="mb-6">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {tool.category}
          </span>
        </div>
      </section>

      {/* Top Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {tool.tool_name}&apos;s Top Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full p-1 mt-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
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
                    strokeLinecap="round"
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

      {/* Pricing Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">
          {tool.tool_name}&apos;s pricing
        </h2>
        <Link href="#" className="text-blue-600 hover:underline">
          View all {tool.tool_name}&apos;s prices
        </Link>
      </section>

      {/* Tags Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-4">Tags</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tool.tags.map((tag, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">{tag}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Share</span>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <span className="text-xs font-bold">f</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <span className="text-xs font-bold">in</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <span className="text-xs font-bold">X</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                <span className="text-xs">W</span>
              </button>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">
            Share your thoughts
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            If you&apos;ve used this product, share your thoughts with other
            customers
          </p>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src="/star-empty.svg"
                alt="Star"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            ))}
          </div>
          <textarea
            placeholder="Write your review here..."
            className="w-full p-3 border border-gray-300 rounded-md mb-4 min-h-[100px]"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Submit Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex items-start gap-4 pb-4 border-b border-gray-200"
            >
              <div
                className={`${getAvatarColor(review.avatar)} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
              >
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">
                    {review.name}
                  </span>
                  <div className="flex items-center">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Image
                        key={i}
                        src="/star.svg"
                        alt="Star"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
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
                    strokeLinecap="round"
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

      {/* Top Alternatives */}
      {similarToolsData.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            Top {tool.tool_name} Alternatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarToolsData.map((similarTool) => (
              <div
                key={similarTool.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <Image
                  src={similarTool.thumbnail_image}
                  alt={similarTool.tool_name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">
                  {similarTool.tool_name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/up-arrow-blank.svg"
                    alt="Upvote"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm text-gray-600">
                    {similarTool.favouriteCount}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {similarTool.headline}
                </p>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                  Compare {similarTool.tool_name} with {tool.tool_name}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
