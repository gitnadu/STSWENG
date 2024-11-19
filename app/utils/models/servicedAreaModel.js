import { Schema, model, models } from "mongoose";

const servicedAreaSchema = new Schema({
  sa_id: {
    type: Schema.Types.ObjectId,
    ref: "ServiceAcknowledgment",
    required: true,
  },
  area_name: { type: String, required: true },
  time_in: { type: Date, required: true },
  time_out: { type: Date, required: true },
  acknowledged_by: { type: String, required: true },
  remarks: { type: String, required: true },
});

const ServicedArea =
  models.ServicedArea ||
  model("ServicedArea", servicedAreaSchema, "serviced_areas");

export default ServicedArea;