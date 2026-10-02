import { useEffect, useState } from "react";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/transactionService";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Load transactions from the backend
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  // Calculate totals
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = totalIncome - totalExpenses;

  // Add transaction
  const handleAddTransaction = async (newTransaction) => {
    try {
      const savedTransaction = await createTransaction({
        description: newTransaction.description,
        category: newTransaction.category,
        date: newTransaction.date,
        type: newTransaction.type,
        amount: Number(newTransaction.amount),
      });

      setTransactions((currentTransactions) => [
        savedTransaction,
        ...currentTransactions,
      ]);

      setShowForm(false);
    } catch (error) {
      console.error(
        "Failed to create transaction:",
        error
      );
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);

      setTransactions((currentTransactions) =>
        currentTransactions.filter(
          (transaction) => transaction.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete transaction:",
        error
      );
    }
  };

  // Open edit form
  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Update transaction
  
  const handleUpdateTransaction = async (
    updatedTransaction
  ) => {
    try {
      const savedTransaction =
        await updateTransaction(
          updatedTransaction.id,
          {
            description: updatedTransaction.description,
            category: updatedTransaction.category,
            date: updatedTransaction.date,
            type: updatedTransaction.type,
            amount: Number(
              updatedTransaction.amount
            ),
          }
        );

      setTransactions((currentTransactions) =>
        currentTransactions.map((transaction) =>
          transaction.id === savedTransaction.id
            ? savedTransaction
            : transaction
        )
      );

      setEditingTransaction(null);
      setShowForm(false);
    } catch (error) {
      console.error(
        "Failed to update transaction:",
        error
      );
    }
  };

    // Filter transactions
    const filteredTransactions = transactions.filter(
      (transaction) => {
        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesType =
          typeFilter === "All" ||
          transaction.type === typeFilter;

        const matchesCategory =
          categoryFilter === "All" ||
          transaction.category === categoryFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        );
      }
    );

  return (
    <div className="transactions-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage your income and expenses.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setEditingTransaction(null);
            setShowForm(true);
          }}
        >
          + Add Transaction
        </button>
      </div>

      {/* Summary */}
      <div className="transaction-summary">
        <div className="transaction-summary-card">
          <span>Total Income</span>

          <strong className="income-text">
            ₹{totalIncome.toLocaleString()}
          </strong>
        </div>

        <div className="transaction-summary-card">
          <span>Total Expenses</span>

          <strong className="expense-text">
            ₹{totalExpenses.toLocaleString()}
          </strong>
        </div>

        <div className="transaction-summary-card">
          <span>Balance</span>

          <strong>
            ₹{balance.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transaction-table-card">
        {/* Filters */}
        <div className="transaction-filters">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="All">
              All Transactions
            </option>

            <option value="Income">
              Income
            </option>

            <option value="Expense">
              Expense
            </option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map(
                (transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <strong>
                        {transaction.description}
                      </strong>
                    </td>

                    <td>
                      {transaction.category}
                    </td>

                    <td>
                      <span
                        className={
                          transaction.type ===
                          "Income"
                            ? "type-badge income-badge"
                            : "type-badge expense-badge"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td
                      className={
                        transaction.type ===
                        "Income"
                          ? "income-text"
                          : "expense-text"
                      }
                    >
                      {transaction.type ===
                      "Income"
                        ? "+"
                        : "-"}
                      ₹
                      {Number(
                        transaction.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() =>
                          handleEditTransaction(
                            transaction
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDeleteTransaction(
                            transaction.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}

              {filteredTransactions.length ===
                0 && (
                <tr>
                  <td colSpan="6">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Form */}
      {showForm && (
        <TransactionForm
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
          onSave={
            editingTransaction
              ? handleUpdateTransaction
              : handleAddTransaction
          }
          transaction={editingTransaction}
        />
      )}
    </div>
  );
}

export default Transactions;