import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      orderBy: {
        deadline: "asc",
      },
    });

    res.json(goals);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch goals",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      target,
      saved,
      deadline,
    } = req.body;

    const goal = await prisma.goal.create({
      data: {
        name,
        target: Number(target),
        saved: Number(saved || 0),
        deadline: new Date(deadline),
      },
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create goal",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      target,
      saved,
      deadline,
    } = req.body;

    const goal = await prisma.goal.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        target: Number(target),
        saved: Number(saved),
        deadline: new Date(deadline),
      },
    });

    res.json(goal);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update goal",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.goal.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Goal deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete goal",
    });
  }
});

export default router;