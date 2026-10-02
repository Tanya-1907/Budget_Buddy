import { useEffect, useState } from "react";
import { getTransactions } from "../../services/transactionService";

function Reports() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error(
          "Failed to load report data:",
          error
        );
      }
    };

    loadTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce(
      (total, t) => total + Number(t.amount),
      0
    );

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce(
      (total, t) => total + Number(t.amount),
      0
    );

  const balance = income - expenses;

  const categoryTotals = {};

  transactions
    .filter((t) => t.type === "Expense")
    .forEach((transaction) => {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        Number(transaction.amount);
    });

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Review your overall financial activity.</p>
        </div>
      </div>

      <div className="transaction-summary">
        <div className="transaction-summary-card">
          <span>Total Income</span>

          <strong className="income-text">
            ₹{income.toLocaleString()}
          </strong>
        </div>

        <div className="transaction-summary-card">
          <span>Total Expenses</span>

          <strong className="expense-text">
            ₹{expenses.toLocaleString()}
          </strong>
        </div>

        <div className="transaction-summary-card">
          <span>Balance</span>

          <strong>
            ₹{balance.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="transaction-table-card">
        <h2>Expenses by Category</h2>

        <div className="budget-list">
          {Object.entries(categoryTotals).length ===
          0 ? (
            <p>No expense data available.</p>
          ) : (
            Object.entries(categoryTotals).map(
              ([category, total]) => (
                <div
                  className="budget-card"
                  key={category}
                >
                  <div className="budget-card-header">
                    <h2>{category}</h2>

                    <strong>
                      ₹{total.toLocaleString()}
                    </strong>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;