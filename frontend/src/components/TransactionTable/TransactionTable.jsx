import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTransactions } from "../../services/transactionService";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getTransactions();

        // Show only the 5 most recent transactions
        const recentTransactions = [...data]
          .sort(
            (a, b) =>
              new Date(b.date) - new Date(a.date)
          )
          .slice(0, 5);

        setTransactions(recentTransactions);
      } catch (error) {
        console.error(
          "Failed to load recent transactions:",
          error
        );
      }
    };

    loadTransactions();
  }, []);

  return (
    <div className="transaction-card">
      <div className="section-header">
        <h2>Recent Transactions</h2>

        <Link
          to="/transactions"
          className="view-all"
        >
          View All
        </Link>
      </div>

      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div
              className="transaction-row"
              key={transaction.id}
            >
              <div>
                <strong>
                  {transaction.description}
                </strong>

                <span>
                  {transaction.category}
                </span>
              </div>

              <div className="transaction-date">
                {new Date(
                  transaction.date
                ).toLocaleDateString()}
              </div>

              <div
                className={
                  transaction.type === "Income"
                    ? "amount income"
                    : "amount expense"
                }
              >
                {transaction.type === "Income"
                  ? "+"
                  : "-"}
                ₹
                {Number(
                  transaction.amount
                ).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionTable;