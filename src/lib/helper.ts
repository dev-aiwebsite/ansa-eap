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
  