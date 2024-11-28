import connectDB from "../../../../utils/connectDB";
import Article from "../../../../utils/models/articleModel";
import ServiceInvoice from "../../../../utils/models/serviceInvoiceModel";

export async function GET(request, { params }) { //Gets a service invoice instance for a customer.
  await connectDB();
  try {
    const customer_id = (await params).id;

    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Service ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const invoices = await ServiceInvoice.find({ customer_id });
    if (invoices.length === 0) {
      return new Response(
        JSON.stringify({ message: "No invoices found for this service." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Invoices retrieved successfully", invoices }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving invoices:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function DELETE(request, { params }) { //Deletes a service invoice instance for a customer.
  await connectDB();

  const customer_id = (await params).id;

  if (!customer_id) {
    return new Response(
      JSON.stringify({ message: "Customer ID must be provided." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const invoices = await ServiceInvoice.find({ customer_id });

    if (invoices.length === 0) {
      return new Response(
        JSON.stringify({ message: "No service invoices found for this customer." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const articleIds = [];
    invoices.forEach(invoice => {
      articleIds.push(...invoice.articles);
    });
    await Article.deleteMany({ si_id: { $in: articleIds } });
    await ServiceInvoice.deleteMany({ customer_id });
    return new Response(
      JSON.stringify({ message: "All articles and invoices deleted successfully for the customer." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting invoices and articles:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}