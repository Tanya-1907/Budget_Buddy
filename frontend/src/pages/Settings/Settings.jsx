import { useState } from "react";

function Settings() {
  const [currency, setCurrency] = useState("INR");
  const [name, setName] = useState("User");

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "budgetBuddySettings",
      JSON.stringify({
        name,
        currency,
      })
    );

    alert("Settings saved.");
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your BudgetBuddy preferences.</p>
        </div>
      </div>

      <div className="transaction-table-card">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Currency</label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
            >
              <option value="INR">
                INR - Indian Rupee
              </option>

              <option value="USD">
                USD - US Dollar
              </option>

              <option value="EUR">
                EUR - Euro
              </option>

              <option value="GBP">
                GBP - British Pound
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;