import { useEffect, useState } from "react";

import {
  getRecurringExpenses,
  createRecurringExpense,
  updateRecurringExpense,
  deleteRecurringExpense,
} from "../../services/recurringExpenseService";

function RecurringExpenses() {
  const [expenses, setExpenses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] =
    useState(null);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Bills");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] =
    useState("Monthly");
  const [nextDueDate, setNextDueDate] =
    useState("");

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getRecurringExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(
          "Failed to load recurring expenses:",
          error
        );
      }
    };

    loadExpenses();
  }, []);

  const resetForm = () => {
    setDescription("");
    setCategory("Bills");
    setAmount("");
    setFrequency("Monthly");
    setNextDueDate("");
    setEditingExpense(null);
  };

  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setCategory(expense.category);
    setAmount(expense.amount);
    setFrequency(expense.frequency);

    setNextDueDate(
      new Date(expense.nextDueDate)
        .toISOString()
        .split("T")[0]
    );

    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const expenseData = {
        description,
        category,
        amount: Number(amount),
        frequency,
        nextDueDate,
        active: editingExpense
          ? editingExpense.active
          : true,
      };

      if (editingExpense) {
        const updatedExpense =
          await updateRecurringExpense(
            editingExpense.id,
            expenseData
          );

        setExpenses((currentExpenses) =>
          currentExpenses.map((expense) =>
            expense.id === updatedExpense.id
              ? updatedExpense
              : expense
          )
        );
      } else {
        const newExpense =
          await createRecurringExpense(
            expenseData
          );

        setExpenses((currentExpenses) => [
          ...currentExpenses,
          newExpense,
        ]);
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error(
        "Failed to save recurring expense:",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecurringExpense(id);

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete recurring expense:",
        error
      );
    }
  };

  return (
    <div className="recurring-page">
      <div className="page-header">
        <div>
          <h1>Recurring Expenses</h1>
          <p>
            Manage your regular monthly and recurring
            payments.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleAddClick}
        >
          + Add Recurring Expense
        </button>
      </div>

      <div className="budget-list">
        {expenses.length === 0 ? (
          <div className="budget-empty">
            <p>No recurring expenses found.</p>

            <button
              className="primary-button"
              onClick={handleAddClick}
            >
              Add Your First Recurring Expense
            </button>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              className="budget-card"
              key={expense.id}
            >
              <div className="budget-card-header">
                <div>
                  <h2>{expense.description}</h2>

                  <span>
                    {expense.category} •{" "}
                    {expense.frequency}
                  </span>

                  <span>
                    Next due:{" "}
                    {new Date(
                      expense.nextDueDate
                    ).toLocaleDateString()}
                  </span>
                </div>

                <strong>
                  ₹
                  {Number(
                    expense.amount
                  ).toLocaleString()}
                </strong>
              </div>

              <div className="budget-actions">
                <button
                  className="action-button"
                  onClick={() =>
                    handleEditClick(expense)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(expense.id)
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
                {editingExpense
                  ? "Edit Recurring Expense"
                  : "Add Recurring Expense"}
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
                <label>Description</label>

                <input
                  type="text"
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  placeholder="Example: Netflix"
                  required
                />
              </div>

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
                <label>Amount</label>

                <input
                  type="number"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target.value
                    )
                  }
                  placeholder="Enter amount"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Frequency</label>

                <select
                  value={frequency}
                  onChange={(event) =>
                    setFrequency(
                      event.target.value
                    )
                  }
                >
                  <option value="Weekly">
                    Weekly
                  </option>
                  <option value="Monthly">
                    Monthly
                  </option>
                  <option value="Yearly">
                    Yearly
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>Next Due Date</label>

                <input
                  type="date"
                  value={nextDueDate}
                  onChange={(event) =>
                    setNextDueDate(
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
                  {editingExpense
                    ? "Update Expense"
                    : "Save Expense"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecurringExpenses;