import Customer from "../../utils/models/customerModel";
import connectDB from "../../utils/connectDB";
import moment from "moment";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)

        //If a url parameter is null, it is converted into undefined. Null value is a falsey value.
        const name = searchParams.get("name");
        const type = searchParams.get("type");
        const status = searchParams.get("status");

        //Columns of Date type is not in the Customer schema. Why is the date filter used?
        const dateStr = searchParams.get("date") ? searchParams.get("date") : null;
        const date = dateStr ? new Date(dateStr) : null; 

        //create filter query.
        const query = {};
        if (name) query.name = {
            $regex: new RegExp(name, "i")
        };
        if (type) query.type = type;
        if (status) query.status = status;
        if (date) {
            const dateWrapper = moment(date);

            query.date = {
                $gte: dateWrapper.toDate(), 
                $lt: moment(dateWrapper).endOf('day').toDate(),
            };
        }

        await connectDB();
        const results = await Customer.find(query).exec();

        return Response.json({ results, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting a summary." }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const {
            name,
            contact_person,
            email_address,
            address,
            services,
            status,
            type,
            contact_number
        } = await request.json();
    
        const currentDate = new Date()
    
        const new_customer = new Customer({
            name: name,
            type: type,
            date: currentDate,
            contact_person: contact_person,
            contact_number: contact_number,
            address: address,
            email_address: email_address,
            status: status,
            services: services
        });
    
        await new_customer.save();
        
        console.log("New customer instance saved.");

        return Response.json({ 
            message: "Creating a new customer instance successful.", 
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating a new customer instance.", 
            status: 500 
        });
    }
}

export async function PUT(request) {
    try {
        const {
            customer_id,
            name,
            contact_person,
            email_address,
            address,
            services,
            status,
            type,
            contact_number
        } = await request.json();

        if (!customer_id) {
            return Response.json({ message: "Customer ID is required for update." }, { status: 400 });
        }
        await connectDB();
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customer_id,
            {
                name: name,
                contact_person: contact_person,
                email_address: email_address,
                address: address,
                services: services,
                status: status,
                type: type,
                contact_number: contact_number
            },
            { new: true } 
        );
        if (!updatedCustomer) {
            return Response.json({ message: "Customer not found." }, { status: 404 });
        }
        console.log("Customer updated successfully.");
        return Response.json({ message: "Customer updated successfully.", updatedCustomer, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while updating the customer.", status: 500 });
    }
}

export async function DELETE() {

}
