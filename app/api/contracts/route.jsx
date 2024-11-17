import Contract from "../../utils/models/contractModel";
import Customer from "../../utils/models/customerModel";
import connectDB from "../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await Contract.find().exec();
        console.log(results)

        return Response.json({ results, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting contracts." }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const {
            customer_id,
            services,
            start_date,
            end_date,
            quotation_total,
            frequency
        } = await request.json();

        const customer = await Customer.findById(customer_id);

        if (!customer) {
            throw new Error(`Customer with id ${customer_id} not found.`);
        }
    
        const start_date_obj = new Date(start_date);
        const end_date_obj = new Date(end_date);
    
        const new_contract = new Contract({
            customer_id: customer_id,
            services: services,
            start_date: start_date_obj,
            end_date: end_date_obj,
            quotation_total: quotation_total,
            frequency: frequency
        });
    
        await new_contract.save();
        
        console.log("New contract instance saved.");

        return Response.json({ 
            message: "Creating a new contract instance successful.", 
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new contract instance.", 
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
