"use server"
import { XMLParser } from "fast-xml-parser";

type RssGuid = { "#text": string; isPermaLink?: string };

type RssJson = {
  rss: {
    channel: {
      title: string;
      link: string;
      description: string;
      lastBuildDate?: string;
      item: {
        guid: RssGuid;
        title: string;
        link: string;
        description: string;
        pubDate?: string;
        "dc:creator"?: string;
        category?: string | string[];
        "content:encoded"?: string;
        "media:content"?: {
          url: string;
          type?: string;
          medium?: string;
        };
        "media:thumbnail"?: {
          url: string;
        };
      }[];
    };
  };
};

export type RssItem = {
  id: string;
  title: string;
  slug: string;
  description: string;   // HTML
  created_at?: string;
  thumbnail?: string;
  author?: string;
  categories: string[];
};


function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

function toText(val: unknown): string {
  if (typeof val === "string") return val;
  if (isRecord(val) && "#text" in val && typeof val["#text"] === "string") {
    return val["#text"];
  }
  return "";
}

function extractImageFromHtml(html?: string): string | undefined {
  if (!html) return undefined;
  // Try <media:content>
  const mediaMatch = html.match(/<media:content[^>]+url="([^"]+)"/i);
  if (mediaMatch) return mediaMatch[1];

  // Fallback: regular <img>
  const imgMatch = html.match(/<img[^>]+src="([^"]+)"/i);
  return imgMatch ? imgMatch[1] : undefined;
}

function mapRssItem(item: RssJson["rss"]["channel"]["item"][0]): RssItem {
  const descriptionHtml = item["content:encoded"] ?? item.description;
  const categories = Array.isArray(item.category)
    ? item.category
    : item.category
    ? [item.category]
    : [];

  const thumbnail =
    item["media:content"]?.url ||
    item["media:thumbnail"]?.url ||
    extractImageFromHtml(descriptionHtml);

  return {
    id: toText(item.guid),
    title: toText(item.title),
    slug: toText(item.link),
    description: descriptionHtml, // HTML
    created_at: item.pubDate,
    thumbnail,
    author: item["dc:creator"] ?? undefined,
    categories,
  };
}

export async function getNews(): Promise<RssItem[]> {
  const res = await fetch("https://www.wellbeing.com.au/feed");
  if (!res.ok) {
    throw new Error(`Failed to fetch RSS feed: ${res.status}`);
  }

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "#text",
  });

  const json = parser.parse(xml) as RssJson;

  const items = json?.rss?.channel?.item ?? [];
  return items.map(mapRssItem);
}
