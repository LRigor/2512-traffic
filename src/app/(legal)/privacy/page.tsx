import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenTools",
  description: "Learn how OpenTools collects, uses, and protects your personal information. Read our privacy policy to understand your rights and our data practices.",
  keywords: ["privacy policy", "data protection", "OpenTools", "personal information", "user privacy"],
  openGraph: {
    title: "Privacy Policy | OpenTools",
    description: "Learn how OpenTools collects, uses, and protects your personal information.",
    type: "website",
    url: "https://opentools.ai/privacy",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | OpenTools",
    description: "Learn how OpenTools collects, uses, and protects your personal information.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 图标组件
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

// Section 组件
const Section = ({ 
  icon, 
  title, 
  children,
  className = ""
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gradient-to-br from-[#e94560] to-[#c23a52] rounded-lg text-white">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    {children}
  </section>
);

// 列表项组件
const ListItem = ({ index, title, desc }: { index: number; title: string; desc: string }) => (
  <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <span className="flex-shrink-0 w-6 h-6 bg-[#e94560] text-white rounded-full flex items-center justify-center text-sm font-medium">
      {index}
    </span>
    <div>
      <strong className="text-gray-900">{title}:</strong> {desc}
    </div>
  </li>
);

export default function PrivacyPolicy() {
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
          <ShieldIcon />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          At OpenTools, we are committed to protecting the privacy of our users&apos;
          personal information. This policy explains how we collect, use, and protect your data.
        </p>
      </div>

      {/* Sections */}
      <Section icon={<DatabaseIcon />} title="Information We Collect">
        <p className="text-gray-700 mb-4">
          We collect several types of information from our users, including:
        </p>
        <ul className="space-y-3 text-gray-700">
          <ListItem index={1} title="Account Information" desc="When you create an account with us, we collect your name, email address, and password." />
          <ListItem index={2} title="Usage Data" desc="Data about your usage, such as features accessed, frequency of use, and time spent." />
          <ListItem index={3} title="Feedback and Support" desc="Payment information when you purchase a subscription or make a payment." />
          <ListItem index={4} title="Payment Information" desc="Additional information from feedback or support requests to help resolve issues." />
        </ul>
      </Section>

      <Section icon={<ShareIcon />} title="How We Use Your Information">
        <p className="text-gray-700 mb-4">
          We use the information we collect from you in several ways, including:
        </p>
        <ul className="space-y-3 text-gray-700">
          <ListItem index={1} title="To provide and improve our tools" desc="Using usage data to improve features and functionality." />
          <ListItem index={2} title="To communicate with you" desc="Sending messages about your account, updates, or policy changes." />
          <ListItem index={3} title="To personalize your experience" desc="Making recommendations based on your usage and feedback." />
          <ListItem index={4} title="To comply with legal obligations" desc="Responding to subpoenas or court orders when required." />
        </ul>
      </Section>

      <Section icon={<ShareIcon />} title="Information Sharing and Disclosure">
        <p className="text-gray-700 mb-4">
          We do not share your personal information with third parties, except:
        </p>
        <ul className="space-y-3 text-gray-700">
          <ListItem index={1} title="Service Providers" desc="Partners that perform services on our behalf under confidentiality agreements." />
          <ListItem index={2} title="Legal Obligations" desc="When required to comply with legal obligations like subpoenas." />
          <ListItem index={3} title="Business Transfers" desc="If we sell or transfer all or a portion of our business." />
        </ul>
      </Section>

      <Section icon={<ClockIcon />} title="Data Retention and Deletion">
        <p className="text-gray-700 leading-relaxed">
          We retain your information for as long as necessary to provide you with access to our tools 
          and to comply with legal obligations. You have the right to request that we delete your 
          personal information from our records. Certain information may be retained for record-keeping 
          purposes, such as billing and payment information.
        </p>
      </Section>

      <Section icon={<LockIcon />} title="Data Security">
        <p className="text-gray-700 leading-relaxed">
          We take reasonable measures to protect your personal information from unauthorized access 
          or disclosure. Our security measures include firewalls, intrusion detection systems, and 
          encryption technologies. However, no security measure can completely eliminate the risk of 
          unauthorized access or disclosure.
        </p>
      </Section>

      <Section icon={<UserIcon />} title="Your Rights and Choices">
        <p className="text-gray-700 mb-4">
          You have several rights regarding your personal information:
        </p>
        <ul className="space-y-3 text-gray-700">
          <ListItem index={1} title="Access and Correction" desc="Request access to and correction of your personal information." />
          <ListItem index={2} title="Deletion" desc="Request that we delete your personal information from our records." />
          <ListItem index={3} title="Opt-Out" desc="Opt out of marketing communications by clicking 'unsubscribe' in emails." />
        </ul>
      </Section>

      <Section icon={<RefreshIcon />} title="Changes to This Privacy Policy">
        <p className="text-gray-700 leading-relaxed">
          We may update this Policy from time to time. If we make changes, we will post the updated 
          version on our website and notify you by email. Your continued use of our tools after any 
          changes will be deemed as your acceptance of the updated Policy.
        </p>
      </Section>
    </div>
  );
}
