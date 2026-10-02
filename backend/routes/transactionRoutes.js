import express from "express";
import prisma from "../lib/prisma.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);

    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
});

// POST create transaction
router.post("/", async (req, res) => {
  try {
    const {
      description,
      category,
      date,
      type,
      amount,
    } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        description,
        category,
        date: new Date(date),
        type,
        amount: Number(amount),
        userId: req.userId,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);

    res.status(500).json({
      message: "Failed to create transaction",
    });
  }
});

// PUT update transaction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      description,
      category,
      date,
      type,
      amount,
    } = req.body;

    const existingTransaction =
      await prisma.transaction.findFirst({
        where: {
          id: Number(id),
          userId: req.userId,
        },
      });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        description,
        category,
        date: new Date(date),
        type,
        amount: Number(amount),
      },
    });

    res.json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);

    res.status(500).json({
      message: "Failed to update transaction",
    });
  }
});

// DELETE transaction
router.delete("/:id", async (req, res) => {
  try {
    const existingTransaction =
      await prisma.transaction.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.userId,
        },
      });

    if (!existingTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await prisma.transaction.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);

    res.status(500).json({
      message: "Failed to delete transaction",
    });
  }
});

export default router;