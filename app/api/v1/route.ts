export async function POST(request: Request) {
  try {
    const { url, hd } = await request.json();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      return new Response(
        JSON.stringify({ error: "API URL not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // API uses URL params
    const apiUrl = new URL(apiBaseUrl);
    apiUrl.searchParams.set("url", url);
    if (hd) {
      apiUrl.searchParams.set("hd", "1");
    }

    const apiRes = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const responseText = await apiRes.text();

    // Check if response is HTML (error page)
    if (responseText.startsWith("<!DOCTYPE") || responseText.startsWith("<html")) {
      console.error("API returned HTML instead of JSON");
      return new Response(
        JSON.stringify({ error: "External API returned an error page" }),
        { status: 502 }
      );
    }

    const response = JSON.parse(responseText);

    if (response.code === 0 && response.data) {
      // Transform the API response to match the expected format
      const videoData = response.data;
      const transformedData = {
        ai_dynamic_cover: videoData.ai_dynamic_cover || videoData.cover,
        title: videoData.title || "Untitled Video",
        duration: videoData.duration ? `${videoData.duration}s` : "0s",
        wmplay: videoData.wmplay || videoData.play,
        hdplay: videoData.hdplay || videoData.play,
        play_count: videoData.play_count || 0,
        share_count: videoData.share_count || 0,
        comment_count: videoData.comment_count || 0,
        author: {
          avatar: videoData.author?.avatar || "",
          nickname: videoData.author?.nickname || "Unknown",
          username: videoData.author?.unique_id || videoData.author?.username || "unknown",
        },
      };
      return new Response(JSON.stringify(transformedData), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(
        JSON.stringify({ error: response.msg || "Failed to fetch video" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Create data error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
