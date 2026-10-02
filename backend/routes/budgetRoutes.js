import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// GET all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);

    res.status(500).json({
      message: "Failed to fetch budgets",
    });
  }
});

// POST create budget
router.post("/", async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    const budget = await prisma.budget.create({
      data: {
        category,
        amount: Number(amount),
        month,
        userId: req.userId,
      },
    });

    res.status(201).json(budget);
  } catch (error) {
    console.error("Error creating budget:", error);

    res.status(500).json({
      message: "Failed to create budget",
    });
  }
});

// PUT update budget
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, month } = req.body;

    const existingBudget =
      await prisma.budget.findFirst({
        where: {
          id: Number(id),
          userId: req.userId,
        },
      });

    if (!existingBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    const budget = await prisma.budget.update({
      where: {
        id: Number(id),
      },
      data: {
        category,
        amount: Number(amount),
        month,
      },
    });

    res.json(budget);
  } catch (error) {
    console.error("Error updating budget:", error);

    res.status(500).json({
      message: "Failed to update budget",
    });
  }
});

// DELETE budget
router.delete("/:id", async (req, res) => {
  try {
    const existingBudget =
      await prisma.budget.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.userId,
        },
      });

    if (!existingBudget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    await prisma.budget.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting budget:", error);

    res.status(500).json({
      message: "Failed to delete budget",
    });
  }
});

// GET budget progress
router.get("/progress", async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
      },
    });

    const transactions =
      await prisma.transaction.findMany({
        where: {
          userId: req.userId,
          type: "Expense",
        },
      });

    const progress = budgets.map((budget) => {
      const spent = transactions
        .filter((transaction) => {
          const transactionDate = new Date(
            transaction.date
          );

          const transactionMonth =
            `${transactionDate.getFullYear()}-${String(
              transactionDate.getMonth() + 1
            ).padStart(2, "0")}`;

          return (
            transaction.category === budget.category &&
            transactionMonth === budget.month
          );
        })
        .reduce(
          (total, transaction) =>
            total + Number(transaction.amount),
          0
        );

      const budgetAmount = Number(budget.amount);
      const remaining = budgetAmount - spent;

      const percentage =
        budgetAmount > 0
          ? (spent / budgetAmount) * 100
          : 0;

      return {
        id: budget.id,
        category: budget.category,
        month: budget.month,
        budget: budgetAmount,
        spent,
        remaining,
        percentage:
          Math.round(percentage * 100) / 100,
      };
    });

    res.json(progress);
  } catch (error) {
    console.error(
      "Error calculating budget progress:",
      error
    );

    res.status(500).json({
      message: "Failed to calculate budget progress",
    });
  }
});

export default router;