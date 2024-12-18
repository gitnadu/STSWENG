import connectDB from "../../../../utils/connectDB";
import ServiceAcknowledgment from "../../../../utils/models/serviceAcknowledgmentModel";

export async function GET(request, { params }) {
  await connectDB();

  try {
    const customer_id = (await params).id;

    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Service ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const acknowledgments = await ServiceAcknowledgment.find({ customer_id });
    if (acknowledgments.length === 0) {
      return new Response(
        JSON.stringify({ message: "No acknowledgments found for this service." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Acknowledgments retrieved successfully", acknowledgments }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving acknowledgments:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, { params }) {
    await connectDB();
    try {
      const customer_id = (await params).id;

      if (!customer_id) {
        return new Response(
          JSON.stringify({ message: "Customer ID is required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const result = await ServiceAcknowledgment.deleteMany({ customer_id });
      if (result.deletedCount === 0) {
        return new Response(
          JSON.stringify({ message: "No acknowledgments found for the specified customer ID." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ message: `Successfully deleted ${result.deletedCount} acknowledgment(s) for customer ID: ${customer_id}.` }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting acknowledgments:", error);
      return new Response(
        JSON.stringify({ message: "Server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}