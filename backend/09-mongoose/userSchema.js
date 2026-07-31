import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 30,
    trim: true,
    required: true,
  },
  accountNumber: {
    type: Number,
    minLength: 10,
    maxLength: 10,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    minLength: 2,
    maxLength: 30,
    trim: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
    required: true,
  },
  balance: {
    type: Number,
    min: 0,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["savings", "current"],
    required: true,
  },
}, { timestamps: true });

const Customer = mongoose.model("Customer", userSchema);

export default Customer;