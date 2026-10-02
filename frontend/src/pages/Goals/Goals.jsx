import { useEffect, useState } from "react";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../services/goalService";

function Goals() {
  const [goals, setGoals] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.error("Failed to load goals:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setTarget("");
    setSaved("");
    setDeadline("");
    setEditingGoal(null);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setName(goal.name);
    setTarget(goal.target);
    setSaved(goal.saved);

    setDeadline(
      new Date(goal.deadline)
        .toISOString()
        .split("T")[0]
    );

    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const goalData = {
      name,
      target: Number(target),
      saved: Number(saved),
      deadline,
    };

    try {
      if (editingGoal) {
        const updated = await updateGoal(
          editingGoal.id,
          goalData
        );

        setGoals((current) =>
          current.map((goal) =>
            goal.id === updated.id
              ? updated
              : goal
          )
        );
      } else {
        const created = await createGoal(goalData);

        setGoals((current) => [
          ...current,
          created,
        ]);
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);

      setGoals((current) =>
        current.filter((goal) => goal.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  return (
    <div className="goals-page">
      <div className="page-header">
        <div>
          <h1>Goals</h1>
          <p>Track your financial goals.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Goal
        </button>
      </div>

      <div className="budget-list">
        {goals.length === 0 ? (
          <div className="budget-empty">
            <p>No goals found.</p>
          </div>
        ) : (
          goals.map((goal) => {
            const percentage =
              Number(goal.target) > 0
                ? Math.min(
                    (Number(goal.saved) /
                      Number(goal.target)) *
                      100,
                    100
                  )
                : 0;

            return (
              <div
                className="budget-card"
                key={goal.id}
              >
                <div className="budget-card-header">
                  <div>
                    <h2>{goal.name}</h2>

                    <span>
                      Deadline:{" "}
                      {new Date(
                        goal.deadline
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <strong>
                    ₹
                    {Number(
                      goal.saved
                    ).toLocaleString()}{" "}
                    / ₹
                    {Number(
                      goal.target
                    ).toLocaleString()}
                  </strong>
                </div>

                <div className="budget-progress-bar">
                  <div
                    className="budget-progress-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <div className="budget-item-footer">
                  <span>
                    {percentage.toFixed(0)}% saved
                  </span>

                  <span>
                    ₹
                    {Math.max(
                      Number(goal.target) -
                        Number(goal.saved),
                      0
                    ).toLocaleString()}{" "}
                    remaining
                  </span>
                </div>

                <div className="budget-actions">
                  <button
                    className="action-button"
                    onClick={() =>
                      handleEdit(goal)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(goal.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h2>
                {editingGoal
                  ? "Edit Goal"
                  : "Add Goal"}
              </h2>

              <button
                type="button"
                className="close-button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Goal Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Example: New Laptop"
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Amount</label>

                <input
                  type="number"
                  value={target}
                  onChange={(e) =>
                    setTarget(e.target.value)
                  }
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount Saved</label>

                <input
                  type="number"
                  value={saved}
                  onChange={(e) =>
                    setSaved(e.target.value)
                  }
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Deadline</label>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(e.target.value)
                  }
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingGoal
                    ? "Update Goal"
                    : "Save Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;