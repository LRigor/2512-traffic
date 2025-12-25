import Link from "next/link";
import type { Tool } from "@/types/tools";

interface PricingProps {
  tool: Tool;
}

export default function Pricing({ tool }: PricingProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-4">
        {tool.tool_name}&apos;s pricing
      </h2>
      <Link href="#" className="text-blue-600 hover:underline">
        View all {tool.tool_name}&apos;s prices
      </Link>
    </section>
  );
}

