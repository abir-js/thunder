import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Customer from "./userSchema.js";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post("/customer", async (req, res) => {
  const customer = req.body;

  if (!customer.name || !customer.age || !customer.accountNumber) {
    return res.status(400).json({
      message: "Name, age and account number are required",
    });
  }

  if (!customer) {
    return res.status(400).json({
      message: "Customer not created",
    });
  }

  // check if customer already exists
  const existingCustomer = await Customer.findOne({
    accountNumber: customer.accountNumber,
  });

  if (existingCustomer) {
    return res.status(400).json({
      message: "Customer already exists",
    });
  }

  await Customer.create(customer);

  res.status(201).json({
    message: "Customer created successfully",
    customer,
  });
});

app.post("/customer/bulk", async (req, res) => {
  const customer = await Customer.insertMany(req.body);
  res.status(201).json({
    message: "Customers created successfully",
    customer,
  });
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json({
    message: "All customers retrieved successfully",
    customers,
  });
});

// filter on city
app.get("/customers/filter", async (req, res) => {
  const { city } = req.query;
  const customers = await Customer.find({ city });
  if (!customers || customers.length === 0) {
    return res.status(404).json({
      message: "No customers found for the given city",
    });
  }
  res.status(200).json({
    message: "Filtered customers retrieved successfully",
    customers,
  });
});

// fetch customer by account number
app.get("/customer/:accountNumber", async (req, res) => {
  const { accountNumber } = req.params;

  const customer = await Customer.findOne({ accountNumber });

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.status(200).json({
    message: "Customer found",
    customer,
  });
});

// delete cusotmer based on account number
app.delete("/customer/:accountNumber", async (req, res) => {
  const {accountNumber} = req.params;
  
  const customer = await Customer.findOneAndDelete({ accountNumber });

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  res.status(200).json({
    message: "Customer deleted successfully",
    customer,
  });
})

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB 🛜");
    app.listen(port, () => {
      console.log(`Server is running on ${process.env.BASE_URL}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
