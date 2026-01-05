import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | OpenTools",
  description: "Read the OpenTools Terms of Service. Understand your rights and obligations when using our AI tools directory platform.",
  keywords: ["terms of service", "terms and conditions", "OpenTools", "user agreement", "legal terms"],
  openGraph: {
    title: "Terms of Service | OpenTools",
    description: "Read the OpenTools Terms of Service. Understand your rights and obligations when using our platform.",
    type: "website",
    url: "https://opentools.ai/terms",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | OpenTools",
    description: "Read the OpenTools Terms of Service. Understand your rights and obligations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 图标组件
const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const BanIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const LockClosedIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ShieldExclamationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ScaleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const ClipboardCheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

// Section 组件
const Section = ({ 
  icon, 
  title, 
  children,
  variant = "default"
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  variant?: "default" | "warning";
}) => (
  <section className={`mb-8 p-6 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 ${
    variant === "warning" 
      ? "bg-amber-50 border-amber-200" 
      : "bg-white border-gray-100"
  }`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg text-white ${
        variant === "warning" 
          ? "bg-gradient-to-br from-amber-500 to-amber-600" 
          : "bg-gradient-to-br from-[#e94560] to-[#c23a52]"
      }`}>
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
);

// 禁止项列表组件
const RestrictedItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3 p-2 bg-red-50 rounded-lg border border-red-100">
    <span className="flex-shrink-0 text-red-500 mt-0.5">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
    <span className="text-sm text-gray-700">{children}</span>
  </li>
);

export default function TermsOfService() {
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
          <DocumentIcon />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Please read these terms carefully before using OpenTools. By using the Software, 
          you agree to be bound by these Terms.
        </p>
      </div>

      {/* Sections */}
      <Section icon={<DocumentIcon />} title="1. Introduction">
        <p className="text-gray-700 leading-relaxed">
          Thank you for using OpenTools (the &quot;Software&quot;). This document constitutes the 
          terms of service (the &quot;Terms&quot;) under which you (the &quot;User&quot;) are allowed to use 
          the Software. Please read these Terms carefully before using the Software. By using 
          the Software, you agree to be bound by these Terms.
        </p>
      </Section>

      <Section icon={<KeyIcon />} title="2. License Grant">
        <p className="text-gray-700 leading-relaxed">
          Subject to your compliance with these Terms, OpenTools grants you a non-exclusive, 
          non-transferable, and non-sublicensable license to use the Software for your internal 
          business purposes. The license granted herein is limited to the number of users and 
          devices specified in your order, and the license fee paid by you.
        </p>
      </Section>

      <Section icon={<BanIcon />} title="3. Use Restrictions">
        <p className="text-gray-700 mb-4">
          You agree not to use the Software in any way that is harmful, illegal, or contrary 
          to these Terms. You shall not:
        </p>
        <ul className="space-y-2">
          <RestrictedItem>Use the Software for any purpose other than your internal business purposes</RestrictedItem>
          <RestrictedItem>Sell, rent, lease, distribute, or otherwise transfer the Software</RestrictedItem>
          <RestrictedItem>Use the Software in any way that could damage, disable, or impair the Software</RestrictedItem>
          <RestrictedItem>Attempt to gain unauthorized access to the Software or related systems</RestrictedItem>
          <RestrictedItem>Engage in any harmful, threatening, abusive, or defamatory activity</RestrictedItem>
          <RestrictedItem>Send unsolicited advertising or spam messages</RestrictedItem>
          <RestrictedItem>Collect or store personal data without consent</RestrictedItem>
        </ul>
      </Section>

      <Section icon={<SparklesIcon />} title="4. Ownership and Intellectual Property Rights">
        <p className="text-gray-700 leading-relaxed">
          The Software and all intellectual property rights therein, including but not limited 
          to copyrights, trademarks, and trade secrets, are owned by OpenTools and its licensors. 
          You agree not to challenge or contest the validity of any such ownership or intellectual 
          property rights.
        </p>
      </Section>

      <Section icon={<LockClosedIcon />} title="5. Confidentiality">
        <p className="text-gray-700 leading-relaxed">
          You shall treat all information and materials provided by OpenTools in connection with 
          the Software as confidential and use them only for the purposes set forth herein. You 
          shall not disclose such information to any third party without the prior written consent 
          of OpenTools.
        </p>
      </Section>

      <Section icon={<ShieldExclamationIcon />} title="6. Warranty Disclaimer" variant="warning">
        <p className="text-gray-700 leading-relaxed font-medium">
          THE SOFTWARE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTY 
          OF ANY KIND, EXPRESS OR IMPLIED. OPENTOOLS DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT 
          LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, 
          AND NON-INFRINGEMENT.
        </p>
      </Section>

      <Section icon={<ExclamationCircleIcon />} title="7. Limitation of Liability" variant="warning">
        <p className="text-gray-700 leading-relaxed font-medium">
          UNDER NO CIRCUMSTANCES SHALL OPENTOOLS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY 
          DIRECT, INDIRECT, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN 
          CONNECTION WITH THE SOFTWARE, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING 
          NEGLIGENCE), OR ANY OTHER LEGAL THEORY.
        </p>
      </Section>

      <Section icon={<XCircleIcon />} title="8. Termination">
        <p className="text-gray-700 leading-relaxed">
          OpenTools reserves the right to terminate these Terms at any time and for any reason, 
          without notice. Upon termination, you shall immediately cease all use of the Software 
          and destroy all copies thereof.
        </p>
      </Section>

      <Section icon={<ScaleIcon />} title="9. Governing Law and Jurisdiction">
        <p className="text-gray-700 leading-relaxed">
          These Terms shall be governed by and construed in accordance with the laws of the 
          State of California, without giving effect to any principles of conflicts of law. 
          Any disputes arising out of or related to these Terms shall be resolved through 
          binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>
      </Section>

      <Section icon={<ClipboardCheckIcon />} title="10. Entire Agreement">
        <p className="text-gray-700 leading-relaxed">
          These Terms constitute the entire agreement between you and OpenTools regarding the 
          use of the Software, and supersede all prior or contemporaneous agreements, whether 
          written or oral.
        </p>
      </Section>

      {/* Acknowledgment */}
      <div className="mt-12 p-6 bg-gradient-to-r from-[#e94560] to-[#c23a52] rounded-xl text-white text-center">
        <p className="font-medium">
          By using the Software, you acknowledge that you have read, understood, 
          and agree to be bound by these Terms.
        </p>
      </div>
    </div>
  );
}
