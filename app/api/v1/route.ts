export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const { url, hd } = await request.json();
      const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, hd }),
      });

      const data = await apiRes.json();

      if (data.msg === "success") {
        return new Response(JSON.stringify(data), { status: 200 });
      } else {
        return new Response(
          JSON.stringify({ error: data.error || "An error occurred" }),
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Create data error:", error);
      return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
}
