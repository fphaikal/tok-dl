export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: "Video URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate that it's a TikTok CDN URL
    const allowedHosts = [
      "tiktokcdn.com",
      "tiktokcdn-us.com",
      "tiktokcdn-eu.com",
      "muscdn.com",
      "byteoversea.com",
    ];

    const urlObj = new URL(videoUrl);
    const isAllowed = allowedHosts.some((host) =>
      urlObj.hostname.endsWith(host)
    );

    if (!isAllowed) {
      return new Response(JSON.stringify({ error: "Invalid video URL" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the video from TikTok CDN
    const videoResponse = await fetch(videoUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.tiktok.com/",
        Accept: "*/*",
      },
    });

    if (!videoResponse.ok) {
      console.error(
        "Failed to fetch video:",
        videoResponse.status,
        videoResponse.statusText
      );
      return new Response(
        JSON.stringify({ error: "Failed to fetch video from source" }),
        {
          status: videoResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get content headers from the original response
    const contentLength = videoResponse.headers.get("content-length");
    const contentType =
      videoResponse.headers.get("content-type") || "video/mp4";

    // Create headers for the proxied response
    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    });

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Stream the video response back to the client
    return new Response(videoResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
