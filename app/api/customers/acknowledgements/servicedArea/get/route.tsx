import connectDB from "../../../../../utils/connectDB";
import ServicedArea from "../../../../../utils/models/servicedAreaModel";

export async function POST(request) {
  await connectDB();
  try {
    const { sa_id } = await request.json();
    if (!sa_id) {
      return new Response(
        JSON.stringify({ message: "Service Acknowledgment ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const servicedAreas = await ServicedArea.find({ sa_id });
    if (servicedAreas.length === 0) {
      return new Response(
        JSON.stringify({ message: "No serviced areas found for this acknowledgment." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Serviced areas retrieved successfully", servicedAreas }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving serviced areas:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}