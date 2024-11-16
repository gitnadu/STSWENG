import { Schema, model, models } from "mongoose";

const contractModel = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  services: {
    type: [String],
    required: true,
    enum: ["Hygenic Pest Control", "Termite Control", "Rodent Control"],
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  quotation_total: { type: Number, required: true },
  frequency: { type: String, required: true },
  file: { type: String, required: false, default: null }, //type not specified for now.
});

const Contract =
  models.Proposal || model("Contract", contractModel, "contracts");
export default Contract;
