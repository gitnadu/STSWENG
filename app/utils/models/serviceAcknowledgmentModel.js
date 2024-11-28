import { Schema, model, models } from "mongoose";

const serviceAckModel = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  date: { type: Date, required: true },
  file: { type: String, required: false },
  service_areas: {
    type: [Schema.Types.ObjectId],
    ref: "ServiceArea",
  },
});

const ServiceAcknowledgment =
  models.ServiceAcknowledgment ||
  model("ServiceAcknowledgment", serviceAckModel, "service_acknowledgments");

export default ServiceAcknowledgment;