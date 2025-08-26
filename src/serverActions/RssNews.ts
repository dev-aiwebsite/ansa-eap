"use server"
import { XMLParser } from "fast-xml-parser";

type Result<T> = {
  success: boolean;
  message: string;
  data: T;
};
type RssGuid = { "#text": string; isPermaLink?: string };

type RssJson = {
  rss: {
    channel: {
        title: string;
        link: string;
        description: string;
        lastBuildDate?: string;
        items: {
            guid: RssGuid;
            title: string;
            link: string;
            description: string;
            pubDate?: string;
        }[];
    };
  };
}
export type RssItem = {
    id: string;
    title: string;
    slug: string;
    description: string;
    created_at?: string;
    thumbnail?: string; 
};

export type RssChannel = {
  title: string;
  link: string;
  description: string;
  lastBuildDate?: string;
  items: RssItem[];
};

export const getNews = async (): Promise<Result<RssChannel | null>> => {
  try {
    const res = await fetch(
      "https://www.abc.net.au/health/indexes/exclude-recipes/rss.xml"
    );
    const xmlText = await res.text();
    const json = await parseRssToJson(xmlText);

    return {
      success: true,
      message: "success",
      data: json,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch news",
      data: null,
    };
  }
};

async function parseRssToJson(xmlString: string): Promise<RssChannel | null> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const parsed: unknown = parser.parse(xmlString);

  if (!isRss(parsed)) {
    return null;
  }

  const channel = parsed.rss.channel;

  const rawItems = Array.isArray(channel.item)
    ? channel.item
    : channel.item
    ? [channel.item]
    : [];

    const items: RssItem[] = await Promise.all(
        rawItems
          .map((item) => (isRssItem(item) ? mapRssItem(item) : null))
          .filter((item): item is RssItem => item !== null)
          .map(async (item) => ({
            ...item,
            thumbnail: (await fetchImageFromPage(item.slug)) ?? "", // fixed: match type
          }))
      );

  return {
    title: String(channel.title ?? ""),
    link: String(channel.link ?? ""),
    description: String(channel.description ?? ""),
    lastBuildDate: channel.lastBuildDate
      ? String(channel.lastBuildDate)
      : undefined,
    items,
  };
}

// ---------- Type Guards ----------
function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

function isRss(val: unknown): val is { rss: { channel: Record<string, unknown> } } {
  return (
    isRecord(val) &&
    "rss" in val &&
    isRecord((val as { rss: unknown }).rss) &&
    "channel" in (val as { rss: { channel: unknown } }).rss &&
    isRecord((val as { rss: { channel: unknown } }).rss.channel)
  );
}

// ---------- Mapper ----------
function mapRssItem(item: RssJson["rss"]["channel"]["items"][0]): RssItem {
  return {
    title: toText(item?.title),
    slug: toText(item.link),
    description: toText(item.description),
    created_at: toText(item.pubDate),
    id: item.guid['#text'],
    thumbnail: undefined, // placeholder until crawled
  };
}

// ---------- Crawl Link for Image ----------
async function fetchImageFromPage(url: string): Promise<string | undefined> {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const html = await res.text();
  
      // try og:image first
      const ogMatch =
        html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  
      if (ogMatch) return ogMatch[1];
  
      // fallback: first image in #mainPic
      const mainPicMatch = html.match(
        /<div[^>]+id=["']mainPic["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']/i
      );
  
      if (mainPicMatch) {
        const imgSrc = mainPicMatch[1];
        return imgSrc.startsWith("http")
          ? imgSrc
          : new URL(imgSrc, url).toString();
      }
  
      return undefined;
    } catch {
      return undefined;
    }
  }

  function toText(val: unknown): string {
    if (typeof val === "string") return val;
    if (isRecord(val) && "#text" in val && typeof val["#text"] === "string") {
      return val["#text"];
    }
    return "";
  }
  

  function isRssItem(val: unknown): val is RssJson["rss"]["channel"]["items"][0] {
    return (
      isRecord(val) &&
      "guid" in val &&
      "title" in val &&
      "link" in val &&
      "description" in val
    );
  }
  