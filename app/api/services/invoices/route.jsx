import ServiceInvoice from "../../../utils/models/serviceInvoiceModel";
import Service from "../../../utils/models/serviceModel";
import connectDB from "../../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await ServiceInvoice.find().exec();
        console.log(results)

        return Response.json({ results, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting service invoices." }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const {
            service_id,
            tin,
            terms,
            pwd_id_no,
            business_type,
        } = await request.json();

        const service = await Service.findById(service_id);

        if (!service) {
            throw new Error(`Service with id ${service_id} not found.`);
        }

        const new_service_invoice = new ServiceInvoice({
            service: customer_id,
            tin: tin,
            terms: terms,
            pwd_id_no: pwd_id_no,
            business_type: business_type,
        });
    
        await new_service_invoice.save();
        
        console.log("New service invoice instance saved.");

        return Response.json({ 
            message: "Creating a new service invoice instance successful.", 
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new service inovice instance.", 
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
