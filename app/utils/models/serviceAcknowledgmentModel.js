import { Schema, model, models } from "mongoose";

const serviceAckModel = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  file: { required: false, default: null }, //type not specified for now.
  service_areas: {
    type: [Schema.Types.ObjectId],
    ref: "ServiceArea",
  },
});

const ServiceAcknowledgment =
  models.ServiceInvoice ||
  model("ServiceAcknowledgment", serviceAckModel, "service_acknowledgments");
export default ServiceAcknowledgment;
