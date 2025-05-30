import React, { useState, useEffect } from "react";

/**
 * MainContainer - PocketBalance Main State Container
 * Handles state (transactions, totals, filter), localStorage syncing, and subcomponent boundaries.
 * All core logic is implemented here; UI subcomponents are stubbed for future implementation.
 */

// Persistent localStorage key for transactions
const STORAGE_KEY = "pocketbalance_transactions";

// Predefined categories for schema-consistency (future: import from config)
const PREDEFINED_CATEGORIES = [
  { label: "Food" },
  { label: "Transport" },
  { label: "Shopping" },
  { label: "Salary" },
  { label: "Entertainment" },
  { label: "Bills" },
  { label: "Other" }
];

// PUBLIC_INTERFACE
function calculateTotals(transactionArray) {
  /**
   * Returns: { income, expenses, balance }
   */
  let income = 0, expenses = 0;
  for (const t of transactionArray) {
    if (t.type === "income") income += t.amount;
    else if (t.type === "expense") expenses += t.amount;
  }
  return {
    income,
    expenses,
    balance: income - expenses
  };
}

/**
 * Placeholder stub components for later build-out.
 * Replace with imports and real component logic in future steps.
 */
function TotalsHeader({ totals }) {
  return (
    <div style={{
      marginTop: 16, marginBottom: 24, padding: 24, background: "var(--kavia-dark)", borderRadius: 8, border: "1px solid var(--border-color)"
    }}>
      {/* Placeholder: Show totals */}
      <div style={{display: "flex", gap: 32, justifyContent: "center", color: "var(--text-secondary)"}}>
        <div>
          <div>Income</div><div style={{fontWeight:"bold", color:"#4caf50"}}>{totals.income.toFixed(2)}</div>
        </div>
        <div>
          <div>Expenses</div><div style={{fontWeight:"bold", color:"#e74c3c"}}>{totals.expenses.toFixed(2)}</div>
        </div>
        <div>
          <div>Balance</div><div style={{fontWeight:"bold", color:"var(--kavia-orange)"}}>{totals.balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function CategoryFilter({ categories, currentFilter, onChange }) {
  return (
    <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        className={`btn${currentFilter === "All" ? " btn-large" : ""}`}
        style={{
          backgroundColor: currentFilter === "All" ? "var(--kavia-orange)" : "var(--kavia-dark)",
          color: "var(--text-color)"
        }}
        onClick={() => onChange("All")}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat.label}
          className={`btn${currentFilter === cat.label ? " btn-large" : ""}`}
          style={{
            backgroundColor: currentFilter === cat.label ? "var(--kavia-orange)" : "var(--kavia-dark)",
            color: "var(--text-color)"
          }}
          onClick={() => onChange(cat.label)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

function TransactionList({ transactions }) {
  return (
    <div>
      <h3 style={{color:"var(--text-secondary)"}}>Transactions</h3>
      {transactions.length === 0 ? (
        <div style={{color:"var(--text-secondary)"}}>No transactions found.</div>
      ) : (
        <ul style={{listStyle:"none", padding:0, margin:0}}>
          {/* Placeholder transaction rendering */}
          {transactions.map(t => (
            <li key={t.id} style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderBottom: "1px solid var(--border-color)",
              padding: "10px 0"
            }}>
              <div>
                <strong style={{color: t.type === "income" ? "#4caf50" : "#e74c3c"}}>
                  {t.type === "income" ? "+" : "-"}{t.amount.toFixed(2)}
                </strong>
                {" "}<span style={{color:"var(--kavia-orange)"}}>{t.category}</span>
                <span style={{color:"var(--text-secondary)", marginLeft: 6}}>{t.description}</span>
              </div>
              <div style={{fontSize:"0.85em", color:"var(--text-secondary)"}}>
                {new Date(t.timestamp).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddTransactionModal({ isOpen, onClose, onAdd, categories }) {
  if (!isOpen) return null;
  // Placeholder modal with no real form logic yet
  return (
    <div style={{
      position:"fixed", left:0, top:0, right:0, bottom:0,
      background:"rgba(0,0,0,0.65)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
    }}>
      <div style={{
        background:"var(--kavia-dark)", padding:32, borderRadius:8, minWidth:320, maxWidth:360, boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
      }}>
        <div style={{marginBottom:16, fontWeight:600}}>Add Income/Expense (Modal Placeholder)</div>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function FloatingActionButton({ onClick }) {
  // Standard floating button, bottom-right corner
  return (
    <button
      className="btn"
      style={{
        position: "fixed",
        right: 24,
        bottom: 32,
        borderRadius: "50%",
        width: 62,
        height: 62,
        fontSize: 40,
        backgroundColor: "var(--kavia-orange)",
        color: "white",
        boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
        zIndex: 1100
      }}
      aria-label="Add Transaction"
      onClick={onClick}
    >+</button>
  );
}

// PUBLIC_INTERFACE
function MainContainer() {
  /**
   * Central state: transactions, totals, filter, isAddModalOpen
   */
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("All");
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let txs = [];
    try {
      txs = stored ? JSON.parse(stored) : [];
    } catch (e) {
      txs = [];
    }
    // Newest first
    txs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setTransactions(txs);
  }, []);

  // Update totals when transactions change
  useEffect(() => {
    setTotals(calculateTotals(transactions));
    // Persist transactions to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Filtered transaction list (All or current category)
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.category === filter);

  // Placeholder add handler for floating action button
  function handleOpenAddModal() { setIsAddModalOpen(true); }
  function handleCloseAddModal() { setIsAddModalOpen(false); }
  function handleAddTransaction(/* transaction */) {
    // Will be implemented; for now just close modal
    setIsAddModalOpen(false);
  }
  function handleFilterChange(newFilter) {
    setFilter(newFilter);
  }

  return (
    <main className="container" style={{paddingTop: 96, minHeight: "100vh"}}>
      {/* Totals summary header */}
      <TotalsHeader totals={totals} />

      {/* Filter controls */}
      <CategoryFilter
        categories={PREDEFINED_CATEGORIES}
        currentFilter={filter}
        onChange={handleFilterChange}
      />

      {/* Transaction list, filtered */}
      <TransactionList transactions={filteredTransactions} />

      {/* Add transaction modal stub */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddTransaction}
        categories={PREDEFINED_CATEGORIES}
      />

      {/* Floating action button */}
      <FloatingActionButton onClick={handleOpenAddModal} />
    </main>
  );
}

export default MainContainer;
