import Link from "next/link";
import Button from "@/components/ui/Button";
import type { Tool } from "@/types/tools";

interface PricingProps {
  tool: Tool;
}

const formatFrequency = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    monthly: "/ monthly",
    annual: "/ yearly",
    yearly: "/ yearly",
    "one-time": " one-time",
    other: "",
    custom: "",
  };
  return frequencyMap[frequency.toLowerCase()] || `/${frequency}`;
};

export default function Pricing({ tool }: PricingProps) {
  if (!tool.pricing_plans || tool.pricing_plans.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-6">
        {tool.tool_name}&apos;s pricing
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {tool.pricing_plans.map((plan) => (
          <div
            key={plan._id}
            className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col"
          >
            <h3 className="text-xl font-bold text-black mb-4">{plan.title}</h3>

            <div className="mb-6 flex-1">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-black">
                  {plan.currency}
                  {plan.price === null || plan.price === undefined
                    ? "Custom"
                    : plan.price === 0
                      ? "0"
                      : plan.price}
                </span>
                {plan.price !== null &&
                  plan.price !== undefined &&
                  plan.cost_frequency && (
                    <span className="text-gray-600 text-lg">
                      {formatFrequency(plan.cost_frequency)}
                    </span>
                  )}
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Get started
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
