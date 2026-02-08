import type { NewsSection as NewsSectionType } from "@/types/news";
import { generateHeadingAnchor } from "./heading-anchor";

interface ArticleBodyProps {
  sections: NewsSectionType[];
}

const sectionParagraphClasses =
  "text-zinc-700 dark:text-zinc-300 leading-relaxed [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:dark:text-blue-400 [&_a]:dark:hover:text-blue-300 [&_a]:hover:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_em]:italic [&_code]:bg-zinc-100 [&_code]:dark:bg-zinc-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono";

/**
 * ArticleBody component renders the main content sections of a news article.
 * 
 * Note: Uses dangerouslySetInnerHTML for rich text content. In production,
 * consider using a sanitization library like DOMPurify for additional security.
 */
export default function ArticleBody({ sections }: ArticleBodyProps) {
  if (sections.length === 0) return null;

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {sections.map((section, index) => {
        const anchor = generateHeadingAnchor(section.heading);
        return (
          <section
            key={`${anchor}-${index}`}
            id={anchor}
            className="mb-8 scroll-mt-24"
            aria-labelledby={`heading-${anchor}`}
          >
            <h2
              id={`heading-${anchor}`}
              className="text-2xl font-bold text-black dark:text-zinc-50 mb-4"
            >
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className={sectionParagraphClasses}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
