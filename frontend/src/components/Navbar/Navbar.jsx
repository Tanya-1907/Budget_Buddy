import { useLocation, useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/authService";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const pageTitles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/budgets": "Budgets",
    "/planning": "Future Planning",
    "/recurring": "Recurring Expenses",
    "/goals": "Goals",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const pageTitle =
    pageTitles[location.pathname] || "BudgetBuddy";

  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };

  const userName = user.name || "User";

  return (
    <header className="navbar">
      <div className="navbar-title">
        {pageTitle}
      </div>

      <div className="navbar-user">
        <span className="notification">
          🔔
        </span>

        <span>Hi, {userName}</span>

        <span className="avatar">
          {userName.charAt(0).toUpperCase()}
        </span>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;