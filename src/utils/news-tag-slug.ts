/**
 * Normalize a tag string to a URL-friendly slug (single source of truth).
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolve a URL slug back to the canonical tag name from a list of tags.
 */
export function slugToTag(slug: string, allTags: string[]): string | null {
  const normalizedSlug = slug.toLowerCase().trim();
  return (
    allTags.find((tag) => tagToSlug(tag) === normalizedSlug) ?? null
  );
}
