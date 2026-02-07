import Link from "next/link";
import { tagToSlug } from "@/utils/news-tag-slug";

interface ArticleTagsListProps {
  tags: string[];
  title?: string;
}

export default function ArticleTagsList({
  tags,
  title = "Tags",
}: ArticleTagsListProps) {
  if (!tags?.length) return null;

  return (
    <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl font-bold text-black dark:text-zinc-50 mb-4">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/news/${tagToSlug(tag)}`}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
