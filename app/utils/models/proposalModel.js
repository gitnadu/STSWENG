import { Schema, model, models } from "mongoose";

const proposalSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  product: { type: String, required: true, enum: ["Exterra Baiting System"] },
  quotation_total: { type: Number, required: true },
  frequency: { type: String, required: true },
  file: { type: String, required: false, default: null }, //type not specified for now.
});

const Proposal =
  models.Proposal || model("Proposal", proposalSchema, "proposals");
export default Proposal;
