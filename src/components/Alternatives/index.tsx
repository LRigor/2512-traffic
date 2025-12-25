"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import type { Tool } from "@/types/tools";

interface AlternativesProps {
  tool: Tool;
  allTools: Tool[];
}

export default function Alternatives({ tool, allTools }: AlternativesProps) {
  // Get similar tools data
  const similarToolsData = (tool.similar_tools || [])
    .map((similar) => allTools.find((t) => t.id === similar.id))
    .filter((t): t is Tool => t !== undefined)
    .slice(0, 6);

  if (similarToolsData.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-6">
        Top {tool.tool_name} Alternatives
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarToolsData.map((similarTool) => (
          <div
            key={similarTool.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
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
            <Button variant="danger" className="w-full">
              Compare {similarTool.tool_name} with {tool.tool_name}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
