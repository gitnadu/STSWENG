import { Schema, model, models } from "mongoose";

const serviceAckModel = new Schema({
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  file: { type: String, required: false, default: null }, //type not specified for now.
  service_areas: {
    type: [Schema.Types.ObjectId],
    ref: "ServiceArea",
  },
});

const ServiceAcknowledgment =
  models.ServiceAcknowledgment ||
  model("ServiceAcknowledgment", serviceAckModel, "service_acknowledgments");
export default ServiceAcknowledgment;
