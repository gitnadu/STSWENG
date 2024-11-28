import connectDB from "../../../../utils/connectDB";
import Proposal from "../../../../utils/models/proposalModel";

export async function GET(request, { params }) { //Gets a proposal instance for a customer.
  await connectDB();

  try {
    const customer_id = (await params).id;

    if (!customer_id) {
      return new Response(
        JSON.stringify({ message: "Customer ID is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const proposals = await Proposal.find({ customer_id });
    if (proposals.length === 0) {
      return new Response(
        JSON.stringify({ message: "No proposals found for this customer." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ message: "Proposals retrieved successfully", proposals }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error retrieving proposals:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, { params }) { //Deletes a proposal instance for a customer.
    await connectDB();
    try {
      const customer_id = (await params).id;

      if (!customer_id) {
        return new Response(
          JSON.stringify({ message: "Customer ID must be provided." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const deletedProposals = await Proposal.deleteMany({ customer_id });
      if (deletedProposals.deletedCount === 0) {
        return new Response(
          JSON.stringify({ message: "No proposals found for the specified customer." }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ message: "Proposals deleted successfully", deletedCount: deletedProposals.deletedCount }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting proposal(s):", error);
      return new Response(
        JSON.stringify({ message: "Server error", error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
}