import Customer from "../../../utils/models/customerModel";

export async function PUT() {

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
