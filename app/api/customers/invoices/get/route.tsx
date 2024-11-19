import connectDB from "../../../../utils/connectDB";
import ServiceInvoice from "../../../../utils/models/serviceInvoiceModel";

export async function POST(request) {
  await connectDB();
  try {
    const { customer_id } = await request.json();

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
