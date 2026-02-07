/**
 * Generates a stable, URL-safe anchor from a heading string for in-page links.
 */
export function generateHeadingAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
