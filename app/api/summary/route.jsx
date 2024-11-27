import { NextResponse } from "next/server";
import Customer from "../../utils/models/customerModel";
import Report from "../../utils/models/reportModel";
import connectDB from "../../utils/connectDB";
import moment from "moment";
import Contract from "@/app/utils/models/contractModel";

export async function GET() {
    try {
        const today = moment().startOf('day').toDate();

        await connectDB();
        const num_of_total_customers = await Customer.find({}).countDocuments();
        const num_of_active_customers = await Customer.find({ status: "Ongoing" }).countDocuments();
        const num_of_accomplished_services = await Customer.find({ status: "Completed" }).countDocuments();
        const num_reports_submitted = await Report.find({}).countDocuments();
        console.log("Today's date:", today);

        const services_today = await Contract.find({ 
            start_date: { $lte: today },
            end_date: { $gte: today }
        });

        console.log("Services found today:", services_today);

        const num_of_services_today = services_today.length;

        return NextResponse.json({ 
            num_of_total_customers,
            num_of_active_customers,
            num_of_accomplished_services,
            num_reports_submitted,
            num_of_services_today
        }, { 
            status: 200 
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred while getting a summary." }, { status: 500 });
    }
};