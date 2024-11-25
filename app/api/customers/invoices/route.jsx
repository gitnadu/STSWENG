import connectDB from "../../../utils/connectDB";
import ServiceInvoice from "../../../utils/models/serviceInvoiceModel";

export async function POST(request) { //Creates a service invoice instance for a customer.
  await connectDB();
  try {
    const { customer_id, tin, terms, pwd_id_no, business_style, file, articles } = await request.json();
    if (!customer_id || !tin || !terms || !business_style) {
      return new Response(
        JSON.stringify({ message: "All required fields must be provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const currentDate = new Date();
    const existingInvoice = await ServiceInvoice.findOne({ customer_id });
    if (existingInvoice) {
      existingInvoice.date = currentDate;
      existingInvoice.tin = tin;
      existingInvoice.terms = terms;
      existingInvoice.pwd_id_no = pwd_id_no;
      existingInvoice.business_style = business_style;
      existingInvoice.file = file || existingInvoice.file;
      existingInvoice.articles = articles || existingInvoice.articles;
      const updatedInvoice = await existingInvoice.save();
      return new Response(
        JSON.stringify({ message: "Invoice updated successfully", invoice: updatedInvoice }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const newInvoice = new ServiceInvoice({
        customer_id,
        date: currentDate,
        tin,
        terms,
        pwd_id_no,
        business_style,
        file: file || null,
        articles: articles || []
      });
      const savedInvoice = await newInvoice.save();
      return new Response(
        JSON.stringify({ message: "Invoice created successfully", invoice: savedInvoice }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error processing invoice:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}