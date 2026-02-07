import { generateHeadingAnchor } from "./heading-anchor";

interface TableOfContentsProps {
  items: string[];
  title?: string;
}

export default function TableOfContents({
  items,
  title = "Table of Contents",
}: TableOfContentsProps) {
  if (items.length === 0) {
    return (
      <nav
        className="mb-12 rounded-lg p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
        aria-label={title}
      >
        <h2 className="text-xl font-bold text-black dark:text-zinc-50 mb-4">
          {title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400">No table of contents available.</p>
      </nav>
    );
  }

  return (
    <nav
      className="mb-12 rounded-lg p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
      aria-label={title}
    >
      <h2 className="text-xl font-bold text-black dark:text-zinc-50 mb-4">
        {title}
      </h2>
      <ul className="space-y-2" role="list">
        {items.map((label, index) => {
          const anchor = generateHeadingAnchor(label);
          return (
            <li key={`${anchor}-${index}`}>
              <a
                href={`#${anchor}`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
