import Link from "next/link";
import type { Tool } from "@/types/tools";

interface RecommendedToolsListProps {
  tools: Tool[];
  title?: string;
}

const DEFAULT_CATEGORY_SLUG = "ai-assistant";

export default function RecommendedToolsList({
  tools,
  title = "Recommended tools",
}: RecommendedToolsListProps) {
  if (tools.length === 0) return null;

  return (
    <section aria-labelledby="recommended-tools-heading">
      <h2
        id="recommended-tools-heading"
        className="text-2xl font-bold text-black dark:text-zinc-50 mb-6"
      >
        {title}
      </h2>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0"
        role="list"
      >
        {tools.map((tool) => (
          <li key={tool.id}>
            <Link
              href={`/${tool.category_slug ?? DEFAULT_CATEGORY_SLUG}/${tool.slug}`}
              className="block bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
            >
              <h3 className="font-bold text-black dark:text-zinc-50 mb-2 line-clamp-2">
                {tool.tool_name}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-3">
                {tool.headline}
              </p>
              <span className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                Learn more
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
