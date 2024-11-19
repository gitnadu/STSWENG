import { Schema, model, models } from "mongoose";

/*
Not finalzied. It will be modified further in the next sprints.
Fields are not complete.
*/
const customerSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: [true, "Type is required."],
    enum: {
      values: [
        "Industrial",
        "Residential",
        "Commercial",
        "Service",
        "Retail",
        "Other",
      ],
      message: "{VALUE} is not supported.",
    },
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  contact_person: {
    type: String,
    required: [true, "Contact person is required."],
  },
  contact_number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(09|\+639)\d{9}$|^(02|\+6302)\d{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number.`,
    },
    required: [true, "Contact number is required"],
  },
  address: { type: String, required: [true, "Address is required."] },
  email_address: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
    required: [true, "Email address is required."],
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["Completed", "Ongoing", "Terminated", "Pending"],
      message: "{VALUE} is not supported.",
    },
  },
  services: {
    type: [String],
    required: true,
    enum: {
      values: ["Hygienic Pest Control", "Termite Control", "Rodent Control"],
      message: "{VALUE} is not supported.",
    },
  },
});

const Customer =
  models.Customer || model("Customer", customerSchema, "customers");
export default Customer;
