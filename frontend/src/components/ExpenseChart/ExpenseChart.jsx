import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { getTransactions } from "../../services/transactionService";

const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#22c55e",
  "#94a3b8",
];

function ExpenseChart() {
  const [data, setData] = useState([]);

  const [period, setPeriod] =
    useState("This Month");

  useEffect(() => {
    const loadExpenseData = async () => {
      try {
        const transactions = await getTransactions();

        const now = new Date();

        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const selectedTransactions =
          transactions.filter((transaction) => {
            if (transaction.type !== "Expense") {
              return false;
            }

            const transactionDate = new Date(
              transaction.date
            );

            const transactionYear =
              transactionDate.getFullYear();

            const transactionMonth =
              transactionDate.getMonth();

            if (period === "This Month") {
              return (
                transactionYear === currentYear &&
                transactionMonth === currentMonth
              );
            }

            if (period === "Last Month") {
              const lastMonthDate = new Date(
                currentYear,
                currentMonth - 1,
                1
              );

              return (
                transactionYear ===
                  lastMonthDate.getFullYear() &&
                transactionMonth ===
                  lastMonthDate.getMonth()
              );
            }

            return false;
          });

        const categoryTotals = {};

        selectedTransactions.forEach(
          (transaction) => {
            const category =
              transaction.category;

            if (!categoryTotals[category]) {
              categoryTotals[category] = 0;
            }

            categoryTotals[category] += Number(
              transaction.amount
            );
          }
        );

        const chartData = Object.entries(
          categoryTotals
        ).map(([name, value]) => ({
          name,
          value,
        }));

        setData(chartData);
      } catch (error) {
        console.error(
          "Failed to load expense chart data:",
          error
        );
      }
    };

    loadExpenseData();
  }, [period]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Expense Breakdown</h2>

        <select
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option value="This Month">
            This Month
          </option>

          <option value="Last Month">
            Last Month
          </option>
        </select>
      </div>

      <div className="chart-container">
        {data.length === 0 ? (
          <p>No expense data available.</p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString()}`
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ExpenseChart;