// pages/api/contracts/getForCustomer.js
import connectDB from "../../../../utils/connectDB";
import Contract from "../../../../utils/models/contractModel";
export async function POST(request) {
  await connectDB();
  try {
    const { customer_id } = await request.json();
    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Customer ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const contracts = await Contract.find({ customer_id });
    if (contracts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No contracts found for this customer." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Contracts retrieved successfully", contracts }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving contracts:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}