import connectDB from "../../../utils/connectDB";
import ServiceAcknowledgment from "../../../utils/models/serviceAcknowledgmentModel";

export async function POST(request) {
  await connectDB();
  try {
    console.log("HELLO");
    const { customer_id, date, file, service_areas } = await request.json();
    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Customer ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const existingAcknowledgment = await ServiceAcknowledgment.findOne({ customer_id });
    if (existingAcknowledgment) {
      existingAcknowledgment.date = date || existingAcknowledgment.date;
      existingAcknowledgment.file = file || existingAcknowledgment.file;
      existingAcknowledgment.service_areas = service_areas || existingAcknowledgment.service_areas;
      const updatedAcknowledgment = await existingAcknowledgment.save();
      return new Response(
        JSON.stringify({ message: "Acknowledgment updated successfully", acknowledgment: updatedAcknowledgment }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const newAcknowledgment = new ServiceAcknowledgment({
        customer_id,
        date: date,
        file: file || null,
        service_areas: service_areas || []
      });
      const savedAcknowledgment = await newAcknowledgment.save();
      return new Response(
        JSON.stringify({ message: "Acknowledgment created successfully", acknowledgment: savedAcknowledgment }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error handling acknowledgment:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}