import type { Tool } from "@/types/tools";

interface FeaturesProps {
  tool: Tool;
}

export default function Features({ tool }: FeaturesProps) {
  if (!tool.features || tool.features.length === 0) {
    return null;
  }

  return (
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
  );
}

