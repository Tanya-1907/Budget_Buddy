import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// GET all recurring expenses
router.get("/", async (req, res) => {
  try {
    const expenses =
      await prisma.recurringExpense.findMany({
        where: {
          userId: req.userId,
        },
        orderBy: {
          nextDueDate: "asc",
        },
      });

    res.json(expenses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recurring expenses",
    });
  }
});

// POST recurring expense
router.post("/", async (req, res) => {
  try {
    const {
      description,
      category,
      amount,
      frequency,
      nextDueDate,
      active,
    } = req.body;

    const expense =
      await prisma.recurringExpense.create({
        data: {
          description,
          category,
          amount: Number(amount),
          frequency,
          nextDueDate: new Date(nextDueDate),
          active: active ?? true,
          userId: req.userId,
        },
      });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create recurring expense",
    });
  }
});

// PUT recurring expense
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      description,
      category,
      amount,
      frequency,
      nextDueDate,
      active,
    } = req.body;

    const existingExpense =
      await prisma.recurringExpense.findFirst({
        where: {
          id: Number(id),
          userId: req.userId,
        },
      });

    if (!existingExpense) {
      return res.status(404).json({
        message: "Recurring expense not found",
      });
    }

    const expense =
      await prisma.recurringExpense.update({
        where: {
          id: Number(id),
        },
        data: {
          description,
          category,
          amount: Number(amount),
          frequency,
          nextDueDate: new Date(nextDueDate),
          active,
        },
      });

    res.json(expense);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update recurring expense",
    });
  }
});

// DELETE recurring expense
router.delete("/:id", async (req, res) => {
  try {
    const existingExpense =
      await prisma.recurringExpense.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.userId,
        },
      });

    if (!existingExpense) {
      return res.status(404).json({
        message: "Recurring expense not found",
      });
    }

    await prisma.recurringExpense.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Recurring expense deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete recurring expense",
    });
  }
});

export default router;