import connectDB from "../../../../../utils/connectDB";
import ServiceInvoice from "../../../../../utils/models/serviceInvoiceModel";
import Article from "../../../../../utils/models/articleModel";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const si_id = (await params).id;

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

export async function DELETE(request, { params }) {
    await connectDB();
    try {
      const si_id = (await params).id;

      if (!si_id) {
        return new Response(
          JSON.stringify({ message: "Service ID must be provided." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const invoice = await ServiceInvoice.findOne({ _id: si_id });
      if (!invoice) {
        return new Response(
          JSON.stringify({ message: "Service Invoice not found." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      await Article.deleteMany({ _id: { $in: invoice.articles } });
      invoice.articles = [];
      await invoice.save();
      return new Response(
        JSON.stringify({ message: "All articles deleted successfully." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting articles:", error);
      return new Response(
        JSON.stringify({ message: "Server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }