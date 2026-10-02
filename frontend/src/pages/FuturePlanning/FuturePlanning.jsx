import { useState } from "react";

function FuturePlanning() {
  const savedPlanning = JSON.parse(
    localStorage.getItem("futurePlanning") || "{}"
  );

  const [income, setIncome] = useState(
    savedPlanning.income || ""
  );

  const [expenses, setExpenses] = useState(
    savedPlanning.expenses || ""
  );

  const [months, setMonths] = useState(
    savedPlanning.months || "12"
  );

  const monthlySavings =
    Number(income || 0) - Number(expenses || 0);

  const projectedSavings =
    monthlySavings * Number(months || 0);

  const savePlanning = () => {
    localStorage.setItem(
      "futurePlanning",
      JSON.stringify({
        income,
        expenses,
        months,
      })
    );

    alert("Future planning saved.");
  };

  return (
    <div className="planning-page">
      <div className="page-header">
        <div>
          <h1>Future Planning</h1>
          <p>
            Plan your future savings and expenses.
          </p>
        </div>
      </div>

      <div className="transaction-table-card">
        <div className="form-group">
          <label>Monthly Income</label>

          <input
            type="number"
            value={income}
            onChange={(e) =>
              setIncome(e.target.value)
            }
            placeholder="Enter monthly income"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Monthly Expenses</label>

          <input
            type="number"
            value={expenses}
            onChange={(e) =>
              setExpenses(e.target.value)
            }
            placeholder="Enter monthly expenses"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Planning Period</label>

          <select
            value={months}
            onChange={(e) =>
              setMonths(e.target.value)
            }
          >
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
          </select>
        </div>

        <button
          className="primary-button"
          onClick={savePlanning}
        >
          Save Planning
        </button>
      </div>

      <div className="transaction-summary">
        <div className="transaction-summary-card">
          <span>Monthly Savings</span>

          <strong
            className={
              monthlySavings >= 0
                ? "income-text"
                : "expense-text"
            }
          >
            ₹{monthlySavings.toLocaleString()}
          </strong>
        </div>

        <div className="transaction-summary-card">
          <span>Projected Savings</span>

          <strong>
            ₹{projectedSavings.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default FuturePlanning;