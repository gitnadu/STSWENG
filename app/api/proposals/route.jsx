import Proposal from "../../utils/models/proposalModel";
import Customer from "../../utils/models/customerModel";
import connectDB from "../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await Proposal.find().exec();
        console.log(results)

        return Response.json({ results, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting proposals." }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const {
            customer_id,
            product,
            quotation_total,
            frequency
        } = await request.json();

        const customer = await Customer.findById(customer_id);

        if (!customer) {
            throw new Error(`Customer with id ${customer_id} not found.`);
        }
    
        const new_proposal = new Contract({
            customer_id: customer_id,
            product: product,
            quotation_total: quotation_total,
            frequency: frequency
        });
    
        await new_proposal.save();
        
        console.log("New proposal instance saved.");

        return Response.json({ 
            message: "Creating a new proposal instance successful.",
        }, {
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new proposal instance."
        }, {
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
