import Article from "../../../../utils/models/articleModel";
import ServiceInvoice from "../../../../utils/models/serviceInvoiceModel";
import connectDB from "../../../../utils/connectDB";

export async function GET() {
    try {
        await connectDB();
        const results = await Article.find().exec();
        console.log(results)

        return Response.json({ results }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ message: "An error occurred while getting services." }, { status: 500 });
    }
};

export async function POST(request) { //Creates multiple instances of article.
    try {
        const {
            si_id,
            articles
        } = await request.json();

        const service_invoice = await ServiceInvoice.findById(si_id);

        if (!service_invoice) {
            throw new Error(`Service invoice with id ${si_id} not found.`);
        }
    
        for (const article of articles) {
            const new_article = new Article({
                si_id: si_id,
                quantity: article.quantity,
                unit: article.unit,
                article_name: article.article_name,
                unit_price: article.unit_price,
                amount: article.amount
            });

            await new_article.save();
        }   
        
        console.log("New article instances saved.");

        return Response.json({ 
            message: "Creating a new article instances successful.",
        }, {
            status: 201 
        });
    } catch (error) {
        console.log("Error: ", error);
        return Response.json({ 
            message: "Error occured while creating new article instances.", 
        }, {
            status: 500 
        });
    }
}

export async function PUT() {

}

export async function DELETE() {

}
