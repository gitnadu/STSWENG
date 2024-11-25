import connectDB from "../../../../utils/connectDB";
import ServicedArea from "../../../../utils/models/servicedAreaModel";
import ServiceAcknowledgment from "../../../../utils/models/serviceAcknowledgmentModel";

export async function POST(request) {
  await connectDB();

  try {
    const { sa_id, area_name, time_in, time_out, acknowledged_by, remarks } = await request.json();
    if (!sa_id || !area_name || !time_in || !time_out || !acknowledged_by || !remarks) {
      return new Response(
        JSON.stringify({ message: "All required fields must be provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const newServicedArea = new ServicedArea({
      sa_id,
      area_name,
      time_in,
      time_out,
      acknowledged_by,
      remarks
    });
    const savedServicedArea = await newServicedArea.save();
    const acknowledgment = await ServiceAcknowledgment.findOne({ _id: sa_id });
    if (!acknowledgment) {
      return new Response(
        JSON.stringify({ message: "Service Acknowledgment not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    acknowledgment.service_areas.push(savedServicedArea._id);
    await acknowledgment.save();
    return new Response(
      JSON.stringify({ message: "Serviced Area created and added to acknowledgment successfully", servicedArea: savedServicedArea }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating serviced area:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}