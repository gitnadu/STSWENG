import Customer from "../../../utils/models/customerModel";

export async function GET(request, { params }) {
    try {
        const customer_id = (await params).id;

        //Updates the selected customer.
        const customer = await Customer.findById(customer_id);

        //Returns a response.
        console.log(`Customer with id ${customer_id} has been found successfully.`);
        console.log(customer);
        return Response.json({ 
            customer,
            status: 200 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while deleting a selected customer instance.", 
            status: 500 
        });
    }
}

export async function PUT(request, { params }) {
    try {
        const customer_id = (await params).id;

        const {
            client_name,
            contact_person,
            email_address,
            address,
            services,
            status,
            type,
            contact_number
        } = await request.json();

        const updated_customer = {
            name: client_name,
            type: type,
            contact_person: contact_person,
            contact_number: contact_number,
            address: address,
            email_address: email_address,
            status: status,
            services: services
        }

        //Updates the selected customer.
        await Customer.updateOne({ _id: customer_id }, updated_customer);

        //Returns a response.
        console.log(`Customer with id ${customer_id} has been updated successfully.`);
        return Response.json({ 
            message: `Customer with id ${customer_id} has been updated successfully.`, 
            status: 200 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while deleting a selected customer instance.", 
            status: 500 
        });
    }
}

export async function DELETE(request, { params }) {
    try {
        const customer_id = (await params).id;

        //Checks whether there are forms of the selected customer.
        //If there are forms, throw an error.

        //Deletes the selected customer.
        await Customer.deleteOne({ _id: customer_id });

        //Returns a response.
        console.log(`Customer with id ${customer_id} has been deleted successfully.`);
        return Response.json({ 
            message: `Customer with id ${customer_id} has been deleted successfully.`, 
            status: 200 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while deleting a selected customer instance.", 
            status: 500 
        });
    }
}
