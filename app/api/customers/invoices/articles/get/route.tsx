import connectDB from "../../../../../utils/connectDB";
import Article from "../../../../../utils/models/articleModel";

export async function POST(request) {
  await connectDB();
  try {
    const { si_id } = await request.json();

    if (!si_id) {
      return new Response(
        JSON.stringify({ message: "Service Invoice ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const articles = await Article.find({ si_id });
    if (articles.length === 0) {
      return new Response(
        JSON.stringify({ message: "No articles found for this invoice." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Articles retrieved successfully", articles }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}