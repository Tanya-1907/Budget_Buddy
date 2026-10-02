import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Budgets from "./pages/Budgets/Budgets";
import FuturePlanning from "./pages/FuturePlanning/FuturePlanning";
import RecurringExpenses from "./pages/RecurringExpenses/RecurringExpenses";
import Goals from "./pages/Goals/Goals";
import Reports from "./pages/Reports/Reports";
import Settings from "./pages/Settings/Settings";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/budgets"
            element={<Budgets />}
          />

          <Route
            path="/planning"
            element={<FuturePlanning />}
          />

          <Route
            path="/recurring"
            element={<RecurringExpenses />}
          />

          <Route
            path="/goals"
            element={<Goals />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;