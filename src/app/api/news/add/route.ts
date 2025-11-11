import { createPost, getPostsByCategory } from '@/serverActions/crudPosts';
import { getRssNews } from '@/serverActions/RssNews';
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newsRes = await getRssNews();
    const { data: existingPosts } = await getPostsByCategory('7p2v1Ur_O4');
    const existingSlugs = new Set(existingPosts?.map(post => post.slug) || []);

    // Filter out news items that already exist
    const newNews = newsRes.filter(news => !existingSlugs.has(news.slug));

    if (!newNews.length) {
      return NextResponse.json({
        success: true,
        message: "No new posts to add",
        data: []
      });
    }

    const addedPosts = await Promise.all(
      newNews.map(async (news) => {
        const addPost = await createPost(news);
        console.log(addPost, 'addPost');
        return addPost;
      })
    );

    return NextResponse.json({ success: true, data: addedPosts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to add news posts' },
      { status: 500 }
    );
  }
}
