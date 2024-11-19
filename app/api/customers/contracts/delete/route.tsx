import connectDB from "../../../../utils/connectDB";
import Contract from "../../../../utils/models/contractModel"; 

export async function DELETE(request) {
  await connectDB();
  try {
    const url = new URL(request.url);
    const customer_id = url.searchParams.get("customer_id");
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