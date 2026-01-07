"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

// FAQ 图标组件
const QuestionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ToolIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

// FAQ 数据
const faqData = [
  {
    category: "General",
    icon: <QuestionIcon />,
    questions: [
      {
        q: "What is OpenTools?",
        a: "OpenTools is a comprehensive directory of AI tools, featuring over 10,000 curated AI solutions across various categories. We help users discover, compare, and choose the best AI tools for their specific needs."
      },
      {
        q: "Is OpenTools free to use?",
        a: "Yes! OpenTools is completely free to use. You can browse our entire directory, read reviews, compare tools, and access all features without any subscription or payment."
      },
      {
        q: "How often is the directory updated?",
        a: "We update our directory daily with new tools, feature updates, and user reviews. Our team continuously verifies and validates information to ensure accuracy."
      },
      {
        q: "Can I submit a tool to OpenTools?",
        a: "Yes! We welcome tool submissions from developers and companies. You can submit your AI tool through our submission form, and our team will review it for inclusion in the directory."
      }
    ]
  },
  {
    category: "Finding Tools",
    icon: <SearchIcon />,
    questions: [
      {
        q: "How do I search for specific AI tools?",
        a: "You can browse tools by category, use our search function, or filter by features, pricing, and ratings. Each category page also allows you to sort tools by popularity, rating, or recent updates."
      },
      {
        q: "What categories of AI tools are available?",
        a: "We organize tools into major categories including AI Assistants, Content Creation, Education, Image Generation, Conversational AI, and many more. Each category contains dozens to hundreds of specialized tools."
      },
      {
        q: "How do I compare different AI tools?",
        a: "Each tool page includes detailed information about features, pricing, user reviews, and alternatives. You can also view side-by-side comparisons of similar tools to make informed decisions."
      },
      {
        q: "Can I save my favorite tools?",
        a: "Yes! You can favorite tools by clicking the heart icon on any tool card. Your favorites are saved and can be accessed anytime."
      }
    ]
  },
  {
    category: "Tool Information",
    icon: <ToolIcon />,
    questions: [
      {
        q: "How are tools rated and reviewed?",
        a: "Tools are rated by our community of users on a 5-star scale. Reviews include detailed feedback about features, usability, value for money, and customer support. All reviews are moderated to ensure authenticity."
      },
      {
        q: "What information is provided for each tool?",
        a: "Each tool listing includes: description, key features, pricing plans, user reviews, ratings, use cases, FAQs, alternatives, and links to the official website."
      },
      {
        q: "Are the tool prices accurate?",
        a: "We strive to keep pricing information up-to-date, but prices may change. We recommend verifying current pricing on the tool's official website before making a purchase decision."
      },
      {
        q: "What does 'Launched Today' mean?",
        a: "Tools in the 'Launched Today' section are newly added to our directory within the last 24 hours. This helps you discover the latest AI innovations as they become available."
      }
    ]
  },
  {
    category: "Pricing & Payments",
    icon: <CreditCardIcon />,
    questions: [
      {
        q: "Do I need to pay to use the tools listed?",
        a: "OpenTools itself is free. However, the AI tools listed may have their own pricing models (free, freemium, paid subscriptions, etc.). Pricing details are shown on each tool's page."
      },
      {
        q: "How can I find free AI tools?",
        a: "You can filter tools by pricing to show only free options. Many tools offer free tiers or trials. Look for the pricing section on each tool page for detailed information."
      },
      {
        q: "What payment methods do the tools accept?",
        a: "Payment methods vary by tool. Most accept major credit cards, and many also support PayPal, cryptocurrency, or other payment options. Check individual tool pages for specific details."
      },
      {
        q: "Are there student or educational discounts?",
        a: "Many AI tools offer educational discounts or free access for students and educators. Check the tool's official website or contact their support team for discount eligibility."
      }
    ]
  },
  {
    category: "Account & Reviews",
    icon: <UserIcon />,
    questions: [
      {
        q: "Do I need an account to browse tools?",
        a: "No, you can browse all tools without creating an account. However, creating an account allows you to save favorites, write reviews, and personalize your experience."
      },
      {
        q: "How do I leave a review?",
        a: "To leave a review, navigate to the tool's page and click the 'Write a Review' button. You'll need to create an account or log in to submit your review."
      },
      {
        q: "Can I edit or delete my review?",
        a: "Yes, you can edit or delete your reviews at any time from your account dashboard. Click on 'My Reviews' to manage your submitted reviews."
      },
      {
        q: "How do I claim my tool listing?",
        a: "If you're the creator or owner of a listed tool, you can claim it by clicking the 'Claim Tool' link on the tool's page. This allows you to update information and respond to reviews."
      }
    ]
  },
  {
    category: "Featured & Rankings",
    icon: <StarIcon />,
    questions: [
      {
        q: "How are featured tools selected?",
        a: "Featured tools are selected based on multiple factors including user ratings, popularity, innovation, and community engagement. Our editorial team regularly reviews and updates featured selections."
      },
      {
        q: "What determines a tool's ranking?",
        a: "Rankings are determined by a combination of factors: user ratings, number of reviews, favorites count, feature completeness, and community engagement. The algorithm is designed to surface the best tools."
      },
      {
        q: "Can I suggest a tool to be featured?",
        a: "Yes! If you think a tool deserves more visibility, you can nominate it through our contact form. Our editorial team reviews all nominations."
      },
      {
        q: "How do badges like 'Top Rated' work?",
        a: "Badges are automatically awarded based on specific criteria. For example, 'Top Rated' is given to tools with an average rating of 4.5+ stars and at least 10 reviews."
      }
    ]
  }
];

// FAQ Item 组件
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#e94560] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-[#e94560] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

// FAQ Category 组件
const FAQCategory = ({ category, icon, questions }: { category: string; icon: React.ReactNode; questions: Array<{ q: string; a: string }> }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{category}</h2>
      </div>
      <div className="space-y-3">
        {questions.map((item, index) => (
          <FAQItem key={index} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤 FAQ
  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#e94560] hover:text-[#c23a52] mb-8 group transition-colors"
      >
        <svg 
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl text-white mb-6 shadow-lg">
          <QuestionIcon />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
          Find answers to common questions about OpenTools, our AI tools directory, 
          and how to get the most out of our platform.
        </p>
      </div>

      {/* Search Box */}
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:border-[#e94560] focus:outline-none text-gray-900 placeholder-gray-400 transition-colors"
          />
          <svg
            className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* FAQ Categories */}
      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((category, index) => (
          <FAQCategory
            key={index}
            category={category.category}
            icon={category.icon}
            questions={category.questions}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No FAQs found matching your search.</p>
        </div>
      )}

      {/* Still Need Help */}
      <div className="mt-12 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-2xl p-8 text-white text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Can&apos;t find the answer you&apos;re looking for? Our support team is here to help you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/help"
            className="px-6 py-3 bg-white text-[#e94560] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Visit Help Center
          </Link>
          <Link 
            href="/contact"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
