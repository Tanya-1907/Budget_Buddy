import { useEffect, useState } from "react";

import { getBudgetProgress } from "../../services/budgetService";

function BudgetProgress() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const loadBudgetProgress = async () => {
      try {
        const data = await getBudgetProgress();
        setBudgets(data);
      } catch (error) {
        console.error(
          "Failed to load budget progress:",
          error
        );
      }
    };

    loadBudgetProgress();
  }, []);

  return (
    <div className="budget-card">
      <div className="section-header">
        <h2>Budget Progress</h2>
      </div>

      <div className="budget-list">
        {budgets.length === 0 ? (
          <p>No budgets found.</p>
        ) : (
          budgets.map((budget) => {
            const percentage = budget.percentage;

            let status = "normal";

            if (percentage >= 100) {
              status = "overspent";
            } else if (percentage >= 90) {
              status = "critical";
            } else if (percentage >= 70) {
              status = "warning";
            }

            return (
              <div
                className={`budget-item ${status}`}
                key={budget.id}
              >
                <div className="budget-item-header">
                  <div className="budget-category">
                    <strong>{budget.category}</strong>
                    <span>{budget.month}</span>
                  </div>

                  <strong>
                    ₹{budget.spent.toLocaleString()} / ₹
                    {budget.budget.toLocaleString()}
                  </strong>
                </div>

                <div className="budget-progress-bar">
                  <div
                    className="budget-progress-fill"
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="budget-item-footer">
                  <span>
                    {percentage}% used
                  </span>

                  <span>
                    {budget.remaining >= 0
                    ? `₹${budget.remaining.toLocaleString()} remaining`
                    : `₹${Math.abs(
                        budget.remaining
                      ).toLocaleString()} over budget`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BudgetProgress;