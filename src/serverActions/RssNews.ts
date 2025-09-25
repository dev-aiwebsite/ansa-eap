"use server"
import { nanoid } from 'nanoid';
import { htmlToPlainText } from '../lib/helper';
import { XMLParser } from "fast-xml-parser";
import { Post } from './crudPosts';

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

function mapRssItem(item: RssJson["rss"]["channel"]["item"][0]): Post {
  const descriptionHtml = item["content:encoded"] ?? item.description;

  // categories (RSS can be multiple or string)
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
    id: nanoid(10),
    title: htmlToPlainText(toText(item.title)),
    slug: toText(item.link),
    description: descriptionHtml, // keep as HTML
    category: "7p2v1Ur_O4", // single string
    author: item["dc:creator"] ?? "Unknown",
    tags: categories.join(","), // same as category for now
    video: item["media:content"]?.type?.includes("video") ? item["media:content"]?.url : undefined,
    audio: item["media:content"]?.type?.includes("audio") ? item["media:content"]?.url : undefined,
    thumbnail,
    duration_hours: 0, // RSS rarely gives duration, safe default
    duration_minutes: 0,
    created_at: item.pubDate ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}


export async function getNews(): Promise<Post[]> {
  let res = await fetch("https://watersedgecounselling.com/category/mental-health-issues-2/feed/");
  
  if (!res.ok) {
    res = await fetch("https://online.vu.edu.au/taxonomy/term/321/all/feed");
  }
  if(!res.ok){
     throw new Error(`Failed to fetch RSS feed: ${res.status}`);
  }

  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    textNodeName: "#text",
    processEntities: true,
  });

  const json = parser.parse(xml) as RssJson;

  const items = json?.rss?.channel?.item ?? [];
  return items.map(mapRssItem);
}
