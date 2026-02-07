import type { NewsSection as NewsSectionType } from "@/types/news";
import { generateHeadingAnchor } from "./heading-anchor";

interface ArticleBodyProps {
  sections: NewsSectionType[];
}

const sectionParagraphClasses =
  "text-zinc-700 dark:text-zinc-300 leading-relaxed [&_a]:text-blue-600 [&_a]:hover:text-blue-700 [&_a]:dark:text-blue-400 [&_a]:dark:hover:text-blue-300 [&_a]:hover:underline [&_a]:underline-offset-2";

export default function ArticleBody({ sections }: ArticleBodyProps) {
  if (sections.length === 0) return null;

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
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
            {section.paragraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className={`${sectionParagraphClasses} ${
                  pIndex < section.paragraphs.length - 1 ? "mb-4" : "mb-0"
                }`}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}
