import { useState } from "react";

function TransactionForm({ onClose, onSave, transaction }) {
  const [type, setType] = useState(
    transaction?.type || "Expense"
  );

  const [amount, setAmount] = useState(
    transaction?.amount || ""
  );

  const [category, setCategory] = useState(
    transaction?.category || "Food"
  );

  const [date, setDate] = useState(
    transaction?.date || ""
  );

  const [description, setDescription] = useState(
    transaction?.description || ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const transactionData = {
      type,
      amount: Number(amount),
      category,
      date,
      description,
    };

    if (transaction) {
      // Editing existing transaction
      onSave({
        ...transaction,
        ...transactionData,
      });
    } else {
      // Adding new transaction
      onSave(transactionData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="transaction-modal">
        <div className="modal-header">
          <h2>
            {transaction
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Transaction Type</label>

            <select
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">
                Entertainment
              </option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <input
              type="text"
              placeholder="Example: Lunch at restaurant"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              required
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {transaction
                ? "Update Transaction"
                : "Save Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;