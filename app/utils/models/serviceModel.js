import { Schema, model, models } from "mongoose";

/*
Not finalzied. It will be modified further in the next sprints.
Fields are not complete.
*/
const serviceSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  date: { type: Date, required: true, default: Date.now },
});

const Service = models.Service || model("Service", serviceSchema, "services");
export default Service;
