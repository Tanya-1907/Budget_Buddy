import "dotenv/config";

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import recurringExpenseRoutes from "./routes/recurringExpenseRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BudgetBuddy API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);

app.use(
  "/api/recurring-expenses",
  recurringExpenseRoutes
);
app.use("/api/goals", goalRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});