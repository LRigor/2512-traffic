import type { Tool } from "@/types/tools";
import Tag from "@/components/ui/Tag";

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
          <Tag key={index} tag={tag} />
        ))}
      </div>
    </section>
  );
}
