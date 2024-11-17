import ServicedArea from "../../../../utils/models/servicedAreaModel";
import ServiceAcknowledgment from "../../../../utils/models/serviceAcknowledgmentModel";
import connectDB from "../../../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await ServicedArea.find().exec();
        console.log(results)

        return Response.json({ results, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting services." }, { status: 500 });
    }
};

export async function POST(request) { //Creates multiple instances of article.
    try {
        const {
            sa_id,
            serviced_areas
        } = await request.json();

        const service_ack = await ServiceAcknowledgment.findById(sa_id);

        if (!service_ack) {
            throw new Error(`Service invoice with id ${sa_id} not found.`);
        }
    
        for (const serviced_area of serviced_areas) {
            const new_serviced_area = new ServicedArea({
                sa_id: sa_id,
                area_name: serviced_area.area_name,
                time_in: serviced_area.time_in,
                time_out: serviced_area.time.out,
                acknowledged_by: serviced_area.acknowledged_by,
                remarks: serviced_area.remarks
            });

            await new_serviced_area.save();
        }   
        
        console.log("New serviced area instances saved.");

        return Response.json({ 
            message: "Creating new serviced area instances successful.",
        }, {
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating new serviced area instances.", 
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
