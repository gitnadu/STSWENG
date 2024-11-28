// pages/api/contracts/getForCustomer.js
import connectDB from "../../../../utils/connectDB";
import Contract from "../../../../utils/models/contractModel";

export async function GET(request, { params }) { //Get a contract instance for a customer.
  await connectDB();
  try {
    const customer_id = (await params).id;

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

export async function DELETE(request, { params }) { //Delete a contract instance for a customer.
  await connectDB();
  try {
    const customer_id = (await params).id;

    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Customer ID must be provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const deletedContracts = await Contract.deleteMany({ customer_id });
    if (deletedContracts.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "No contracts found for the specified customer." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Contracts deleted successfully", deletedCount: deletedContracts.deletedCount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting contract(s):", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}