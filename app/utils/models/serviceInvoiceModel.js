import { Schema, model, models } from "mongoose";

const serviceInvoiceModel = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: { type: Date, required: true },
  tin: { type: Number, required: true },
  terms: { type: String, required: true },
  pwd_id_no: { type: String, required: false },
  business_style: { type: String, required: true },
  file: { type: String, required: false }, //type not specified for now.
  articles: {
    type: [Schema.Types.ObjectId],
    ref: "Article",
  },
});

const ServiceInvoice =
  models.ServiceInvoice ||
  model("ServiceInvoice", serviceInvoiceModel, "service_invoices");
export default ServiceInvoice;
