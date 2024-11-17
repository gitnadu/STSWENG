import ServiceAcknowledgment from "../../../utils/models/serviceAcknowledgmentModel";
import Service from "../../../utils/models/serviceModel";
import connectDB from "../../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await ServiceAcknowledgment.find().exec();
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
            service_areas
        } = await request.json();

        const service = await Service.findById(service_id);

        if (!service) {
            throw new Error(`Service with id ${service_id} not found.`);
        }

        const new_service_ack = new ServiceAcknowledgment({
            service: service_id,
            service_areas: service_areas
        });
    
        await new_service_ack.save();
        
        console.log("New service acknowledgment instance saved.");

        return Response.json({ 
            message: "Creating a new service acknowledgment instance successful.", 
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new service acknowledgment instance.", 
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}