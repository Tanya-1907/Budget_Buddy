import { useEffect, useState } from "react";

import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import IncomeExpenseChart from "../../components/IncomeExpenseChart/IncomeExpenseChart";

import TransactionTable from "../../components/TransactionTable/TransactionTable";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress";

import { getTransactions } from "../../services/transactionService";
import { getGoals } from "../../services/goalService";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [activeGoals, setActiveGoals] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const transactionsData =
          await getTransactions();

        const goalsData =
          await getGoals();

        setTransactions(transactionsData);

        setActiveGoals(goalsData.length);
      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );

        setError(
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const amountSaved =
    totalIncome - totalExpenses;

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <h2>Loading dashboard...</h2>

          <p>
            Please wait while we load your
            financial data.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-error">
          <h2>Something went wrong</h2>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Good morning! 👋</h1>

      <p className="dashboard-subtitle">
        Here's your financial overview.
      </p>

      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Income</p>

          <h2>
            ₹{totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Total Expenses</p>

          <h2>
            ₹{totalExpenses.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Amount Saved</p>

          <h2>
            ₹{amountSaved.toLocaleString()}
          </h2>
        </div>

        <div className="summary-card">
          <p>Active Goals</p>

          <h2>{activeGoals}</h2>
        </div>
      </div>

      <div className="charts-grid">
        <ExpenseChart />
        <IncomeExpenseChart />
      </div>

      <div className="bottom-grid">
        <TransactionTable />
        <BudgetProgress />
      </div>
    </div>
  );
}

export default Dashboard;