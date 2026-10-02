import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getTransactions } from "../../services/transactionService";

function IncomeExpenseChart() {
  const [data, setData] = useState([]);

  const [period, setPeriod] =
    useState("Last 6 Months");

  useEffect(() => {
    const loadMonthlyData = async () => {
      try {
        const transactions = await getTransactions();

        const monthlyData = {};

        transactions.forEach((transaction) => {
          const date = new Date(transaction.date);

          const monthKey = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}`;

          const monthName = date.toLocaleString(
            "en-US",
            {
              month: "short",
            }
          );

          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
              monthKey,
              month: monthName,
              income: 0,
              expenses: 0,
            };
          }

          if (transaction.type === "Income") {
            monthlyData[monthKey].income += Number(
              transaction.amount
            );
          }

          if (transaction.type === "Expense") {
            monthlyData[monthKey].expenses += Number(
              transaction.amount
            );
          }
        });

        const monthsToShow =
          period === "Last 12 Months" ? 12 : 6;

        const chartData = Object.values(monthlyData)
          .sort((a, b) =>
            a.monthKey.localeCompare(b.monthKey)
          )
          .slice(-monthsToShow);

        setData(chartData);
      } catch (error) {
        console.error(
          "Failed to load monthly data:",
          error
        );
      }
    };

    loadMonthlyData();
  }, [period]);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h2>Monthly Trend</h2>

        <select
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option value="Last 6 Months">
            Last 6 Months
          </option>

          <option value="Last 12 Months">
            Last 12 Months
          </option>
        </select>
      </div>

      <div className="chart-container">
        {data.length === 0 ? (
          <p>No transaction data available.</p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString()}`
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#16a34a"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default IncomeExpenseChart;