import { useEffect, useState } from "react";

import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../services/budgetService";

function getCurrentMonth() {
  const today = new Date();

  return `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;
}

function Budgets() {
  const [budgets, setBudgets] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] =
    useState(null);

  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [month, setMonth] =
    useState(getCurrentMonth());

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const data = await getBudgets();
        setBudgets(data);
      } catch (error) {
        console.error(
          "Failed to load budgets:",
          error
        );
      }
    };

    loadBudgets();
  }, []);

  const handleAddClick = () => {
    setEditingBudget(null);
    setCategory("Food");
    setAmount("");
    setMonth(getCurrentMonth());
    setShowForm(true);
  };

  const handleEditClick = (budget) => {
    setEditingBudget(budget);
    setCategory(budget.category);
    setAmount(budget.amount);
    setMonth(budget.month);
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const budgetData = {
        category,
        amount: Number(amount),
        month,
      };

      if (editingBudget) {
        const updatedBudget =
          await updateBudget(
            editingBudget.id,
            budgetData
          );

        setBudgets((currentBudgets) =>
          currentBudgets.map((budget) =>
            budget.id === updatedBudget.id
              ? updatedBudget
              : budget
          )
        );
      } else {
        const newBudget =
          await createBudget(budgetData);

        setBudgets((currentBudgets) => [
          newBudget,
          ...currentBudgets,
        ]);
      }

      setShowForm(false);
      setEditingBudget(null);
      setAmount("");
    } catch (error) {
      console.error(
        "Failed to save budget:",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);

      setBudgets((currentBudgets) =>
        currentBudgets.filter(
          (budget) => budget.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete budget:",
        error
      );
    }
  };

  return (
    <div className="budgets-page">
      <div className="page-header">
        <div>
          <h1>Budgets</h1>
          <p>Manage your monthly budgets.</p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddClick}
        >
          + Add Budget
        </button>
      </div>

      <div className="budget-list">
        {budgets.length === 0 ? (
          <div className="budget-empty">
            <p>No budgets found.</p>

            <button
              className="primary-button"
              onClick={handleAddClick}
            >
              Create Your First Budget
            </button>
          </div>
        ) : (
          budgets.map((budget) => (
            <div
              className="budget-card"
              key={budget.id}
            >
              <div className="budget-card-header">
                <div>
                  <h2>{budget.category}</h2>
                  <span>{budget.month}</span>
                </div>

                <strong>
                  ₹
                  {Number(
                    budget.amount
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="budget-actions">
                <button
                  className="action-button"
                  onClick={() =>
                    handleEditClick(budget)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(budget.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h2>
                {editingBudget
                  ? "Edit Budget"
                  : "Add Budget"}
              </h2>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                >
                  <option value="Food">Food</option>
                  <option value="Transport">
                    Transport
                  </option>
                  <option value="Bills">Bills</option>
                  <option value="Shopping">
                    Shopping
                  </option>
                  <option value="Entertainment">
                    Entertainment
                  </option>
                  <option value="Health">
                    Health
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Budget Amount</label>

                <input
                  type="number"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target.value
                    )
                  }
                  placeholder="Enter budget amount"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Month</label>

                <input
                  type="month"
                  value={month}
                  onChange={(event) =>
                    setMonth(
                      event.target.value
                    )
                  }
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingBudget
                    ? "Update Budget"
                    : "Save Budget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Budgets;