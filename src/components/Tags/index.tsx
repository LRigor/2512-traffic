import type { Tool } from "@/types/tools";

interface TagsProps {
  tool: Tool;
}

export default function Tags({ tool }: TagsProps) {
  if (!tool.tags || tool.tags.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-black mb-4">Tags</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tool.tags.map((tag, index) => (
          <label key={index} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700">{tag}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
