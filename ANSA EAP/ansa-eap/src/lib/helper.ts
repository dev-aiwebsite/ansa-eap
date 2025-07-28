export function slugifyName(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')         // remove non-word characters
      .replace(/\s+/g, '-')             // replace spaces with hyphens
      .replace(/--+/g, '-');            // collapse multiple hyphens
  }
  