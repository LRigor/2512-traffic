"use client";

import Button from "@/components/ui/Button";
import type { Tool } from "@/types/tools";

interface AlternativesProps {
  tool: Tool;
}

export default function Alternatives({ tool }: AlternativesProps) {
  // Use similar_tools data directly (lightweight version without images)
  const similarToolsData = (tool.similar_tools || []).slice(0, 6);

  if (similarToolsData.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-6">
        Top {tool.tool_name} Alternatives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarToolsData.map((similarTool) => (
          <div
            key={similarTool.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-4">
              {similarTool.tool_name}
            </h3>
            <Button variant="danger" className="w-full">
              Compare {similarTool.tool_name} with {tool.tool_name}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
