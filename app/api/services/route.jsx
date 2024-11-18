import Service from "../../utils/models/serviceModel";
import Customer from "../../utils/models/customerModel";
import connectDB from "../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await Service.find().exec();
        console.log(results)

        return Response.json({ results }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting services." }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const {
            customer_id,
            date
        } = await request.json();

        const customer = await Customer.findById(customer_id);

        if (!customer) {
            throw new Error(`Customer with id ${customer_id} not found.`);
        }
    
        const date_obj = new Date(date);

        const new_service = new Service({
            customer_id: customer_id,
            date: date_obj
        });
    
        await new_service.save();
        
        console.log("New service instance saved.");

        return Response.json({ 
            message: "Creating a new service instance successful.",
        }, {
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new service instance.",
        }, {
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
