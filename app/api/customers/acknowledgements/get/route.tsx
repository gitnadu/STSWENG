import connectDB from "../../../../utils/connectDB";
import ServiceAcknowledgment from "../../../../utils/models/serviceAcknowledgmentModel";

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