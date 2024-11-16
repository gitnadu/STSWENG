import connectDB from "../../../../../utils/connectDB";
import Article from "../../../../../utils/models/articleModel";
import ServiceInvoice from "../../../../../utils/models/serviceInvoiceModel";

export async function POST(request) {
  await connectDB();
  try {
    const { si_id, quantity, unit, article_name, unit_price, amount } = await request.json();
    if (!si_id || !quantity || !unit || !article_name || !unit_price || !amount) {
      return new Response(
        JSON.stringify({ message: "All required fields must be provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newArticle = new Article({
      si_id,
      quantity,
      unit,
      article_name,
      unit_price,
      amount
    });
    const savedArticle = await newArticle.save();
    const invoice = await ServiceInvoice.findOne({ _id: si_id });
    if (!invoice) {
      return new Response(
        JSON.stringify({ message: "Service Invoice not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    invoice.articles.push(savedArticle._id);
    await invoice.save();
    return new Response(
      JSON.stringify({ message: "Article created and added to invoice successfully", article: savedArticle }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}