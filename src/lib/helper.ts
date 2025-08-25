export function slugifyName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')         // remove non-word characters
      .replace(/\s+/g, '-')             // replace spaces with hyphens
      .replace(/--+/g, '-');            // collapse multiple hyphens
  }
  
  export function unslugifyName(slug: string): string {
    return slug
      .replace(/-/g, ' ')           // replace hyphens with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()) // optional: capitalize first letters
      .trim();
  }
  

  export function truncateText(text: string, maxChars: number, ending = '…'): string {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trimEnd() + ending;
  }

  export function formatDuration(hours: number, minutes: number): string {
    const h = hours > 0 ? `${hours}h` : "";
    const m = minutes > 0 ? `${minutes}m` : "";
    return `${h} ${m}`.trim() || "0m";
  }
  
  export const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, ""); // remove all tags
  }
  
  export const decodeHtmlEntities = (text: string) => {
    return text.replace(/&nbsp;/g, " ")
               .replace(/&amp;/g, "&")
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'")
               .replace(/&lt;/g, "<")
               .replace(/&gt;/g, ">");
  }
  

  export const htmlToPlainText = (html: string): string => {
    return html
      // Convert block-level tags to line breaks
      .replace(/<\/(h1|h2|h3|h4|h5|h6|p|div|blockquote)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/li>/gi, "\n")
      // Remove all other tags
      .replace(/<[^>]+>/g, "")
      // Decode common entities
      .replace(/&nbsp;/gi, " ")
      .replace(/&#160;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      // Collapse multiple line breaks/spaces
      .replace(/\n{2,}/g, "\n")
      .trim();
  }
  
  

  