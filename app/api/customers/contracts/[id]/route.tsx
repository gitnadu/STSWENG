// pages/api/contracts/getForCustomer.js
import connectDB from "../../../../utils/connectDB";
import Customer from "../../../../utils/models/customerModel";
import Contract from "../../../../utils/models/contractModel";

export async function GET(request) { //Get a contract instance for a customer.
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

export async function POST(request) { //Create a contract instance for a customer.
  await connectDB();
  try {
    const { customer_id, services, start_date, end_date, quotation_total, frequency, file } = await request.json();
    if (!customer_id || !services || !start_date || !end_date || !quotation_total || !frequency) {
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
    const contract = await Contract.findOne({ customer_id });
    if (contract) {
      contract.services = services;
      contract.start_date = new Date(start_date);
      contract.end_date = new Date(end_date);
      contract.quotation_total = quotation_total;
      contract.frequency = frequency;
      contract.file = file || null;
      const updatedContract = await contract.save();
      return new Response(
        JSON.stringify({ message: "Contract updated successfully", contract: updatedContract }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const newContract = new Contract({
        customer_id,
        services,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        quotation_total,
        frequency,
        file: file || null,
      });
      const savedContract = await newContract.save();
      return new Response(
        JSON.stringify({ message: "Contract created successfully", contract: savedContract }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error handling contract:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

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