import connectDB from "../../../../utils/connectDB";
import Customer from "../../../../utils/models/customerModel";
import Proposal from "../../../../utils/models/proposalModel";

export async function POST(request) {
  await connectDB();

  try {
    const { customer_id, product, quotation_total, frequency, file } = await request.json();
    if (!customer_id || !product || !quotation_total || !frequency) {
      return new Response(
        JSON.stringify({ message: "All required fields must be provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return new Response(
        JSON.stringify({ message: "Customer not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const proposal = await Proposal.findOne({ customer_id });
    if (proposal) {
      proposal.product = product;
      proposal.quotation_total = quotation_total;
      proposal.frequency = frequency;
      proposal.file = file || proposal.file;
      const updatedProposal = await proposal.save();
      return new Response(
        JSON.stringify({ message: "Proposal updated successfully", proposal: updatedProposal }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const newProposal = new Proposal({
        customer_id,
        product,
        quotation_total,
        frequency,
        file: file || null,
      });
      const savedProposal = await newProposal.save();
      return new Response(
        JSON.stringify({ message: "Proposal created successfully", proposal: savedProposal }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error processing proposal:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
//depresso