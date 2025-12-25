import type { Tool } from "@/types/tools";

interface DescriptionProps {
  tool: Tool;
}

export default function Description({ tool }: DescriptionProps) {
  return (
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
  );
}

