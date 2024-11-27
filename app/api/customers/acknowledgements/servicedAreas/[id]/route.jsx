import connectDB from "../../../../../utils/connectDB";
import ServicedArea from "../../../../../utils/models/servicedAreaModel";
import ServiceAcknowledgment from "../../../../../utils/models/serviceAcknowledgmentModel";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const sa_id = (await params).id;
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

export async function DELETE(request, { params }) {
    await connectDB();
    try {
      const sa_id = (await params).id;
      if (!sa_id) {
        return new Response(
          JSON.stringify({ message: "Service acknowledgment ID (sa_id) must be provided." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const acknowledgment = await ServiceAcknowledgment.findOne({ _id: sa_id });
      if (!acknowledgment) {
        return new Response(
          JSON.stringify({ message: "Service Acknowledgment not found." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      await ServicedArea.deleteMany({ sa_id });
      acknowledgment.service_areas = acknowledgment.service_areas.filter(() => {
        return false; 
      });
      await acknowledgment.save();
      return new Response(
        JSON.stringify({ message: "All serviced areas deleted successfully for the specified sa_id." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting serviced areas:", error);
      return new Response(
        JSON.stringify({ message: "Server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}