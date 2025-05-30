# PocketBalance Main Container - Requirements Document

## Overview

PocketBalance is a minimalist, dark-themed React web application that enables users to track personal income and expenses, view balances, and filter transactions—all without requiring an account or internet connection. The main container serves as the core interface for all user actions, summary display, and data storage utilizing local device storage.

---

## Table of Contents

1. Functional Requirements
2. Non-Functional Requirements
3. UI/UX Expectations
4. Color Palette and Theme Specifications
5. Component Breakdown and Responsibilities
6. Data Schema and Storage
7. Architectural & Technical Requirements

---

## 1. Functional Requirements

1. **Add Income/Expense**
   - Users must be able to add new transaction entries.
   - Each entry must include:
     - Amount (number)
     - Category (from a predefined set, e.g., Food, Transport, Salary)
     - Optional description (text)
     - Income or expense type
     - Timestamp (auto-generated or user-selectable)
2. **View Totals**
   - The app will display the following aggregates at the top of the main screen:
     - Total income
     - Total expenses
     - Current balance (income minus expenses)
   - Totals update instantly as new entries are added.
3. **Filter by Category**
   - Users may filter the transaction list by category; e.g., view only "Food" or "Salary" entries.
   - A UI element (e.g., dropdown, tabs, or buttons) will allow category selection.
   - When no filter is selected, all transactions are shown.
4. **View Recent Transactions**
   - Below the summary, a list of recent transactions is displayed in reverse chronological order.
   - Each item shows: amount, category, description, and timestamp, styled clearly to indicate income vs. expense.
5. **Local Data Storage**
   - All transaction data is stored in the user's browser via localStorage.
   - No backend, external server, or remote APIs are involved.
   - Data persists between sessions and page reloads.
6. **Zero Login or Registration**
   - The app operates without any form of user registration or authentication.

---

## 2. Non-Functional Requirements

- **Framework & Technology:**  
  - Built with React JS (JavaScript ES6+). Pure React; no additional UI frameworks or libraries.
- **Performance:**  
  - Fast loading and minimal dependencies for optimal speed.
- **Responsiveness:**  
  - Layout must adapt smoothly to common device widths (mobile and desktop).
  - Key content and actions remain accessible on both small and large screens.
- **Accessibility:**  
  - Sufficient color contrast, semantic HTML elements, and intuitive keyboard navigation should be present.
- **Offline/Standalone Usage:**  
  - All features must function without an internet connection after initial page load.
- **No Third-Party Backend or Analytics:**  
  - Absolutely no external tracking, login, or data transfer off-device.

---

## 3. UI/UX Expectations

- **Dark Mode by Default:**  
  - The background, containers, and navigation bar all utilize dark colors for a modern look.
  - All text must use light coloring for contrast.
- **Minimal, Modern, and Intuitive Layout:**  
  - At the top, a fixed navigation bar displays the app name and possibly a menu or action button.
  - Directly beneath, clear summary cards/widgets show income, expenses, and balance.
  - The transaction list appears below summaries, followed by UI for adding or filtering entries.
- **Floating Action Button:**  
  - Clearly visible button for adding transactions, positioned for easy thumb reach on mobile.
- **Component Aesthetics:**  
  - Visual grouping of related information (e.g., cards or well-separated sections).
  - Use of rounded corners, clear iconography (if implemented), and accessible font sizes.
- **Instant Feedback:**  
  - All actions (adding, filtering) provide immediate update of totals and lists.
- **Button and Input Styling:**  
  - Buttons adopt the accent color and visually respond to hover/focus.
- **Typography:**  
  - Bold, clear headings for summary and list sections.
  - All font and spacing derived from the base font stack and CSS.

---

## 4. Color Palette and Theme Specifications

Defined in `src/App.css`:
```
:root {
  --kavia-orange: #E87A41;              /* Accent/Primary Action */
  --kavia-dark: #1A1A1A;                /* Main background/nav */
  --text-color: #ffffff;                /* Primary text */
  --text-secondary: rgba(255,255,255,0.7); /* Secondary/description text */
  --border-color: rgba(255,255,255,0.1);   /* Borders/dividers */
}
```
- **Primary (Accent):** Kavia Orange (`#E87A41`)
- **Background:** Kavia Dark (`#1A1A1A`)
- **Text:** White and semi-transparent white for secondary details
- **Borders:** Subtle, low opacity white to divide sections in dark UI

Other color values restricted to these, ensuring brand consistency.

---

## 5. Component Breakdown and Responsibilities

| Component          | Responsibility                                                                    |
|--------------------|-----------------------------------------------------------------------------------|
| App/Main Container | Holds state and orchestrates the UI, including navigation and main content areas   |
| Navbar             | Fixed header with app title and (optionally) actions                              |
| Summary/Top Cards  | Displays total income, total expenses, and balance                                |
| Transaction List   | Shows all transactions, responsive to filtering and instant updates               |
| Filter Controls    | Allows selection of a specific category to filter the transaction list            |
| Add Entry Form     | UI for adding a new income or expense, validation, and storing data locally       |
| Floating Action Btn| Prominently launches the add-entry form/modal                                     |

All components are styled using the classes and variables in `src/App.css`. No additional UI frameworks are used.

---

## 6. Data Schema and Storage

- **Transaction Object Structure (in localStorage array):**
  ```js
  {
    id: string,            // Unique identifier (e.g., UUID or timestamp-based)
    amount: number,        // Positive decimal
    category: string,      // One of predefined categories
    description: string,   // Optional, short freeform text
    type: "income" | "expense", // Transaction type
    timestamp: string      // ISO-8601 or locale date/time string
  }
  ```
- **Storage Key:**  
  All transactions are grouped under a single `localStorage` key (e.g., `"pocketbalance_transactions"`).
- **Persistence Behavior:**
  - On page load, the app loads parsed transaction data from localStorage.
  - On modification (add/remove), the updated array is serialized and saved back.
  - All aggregate values are computed client-side.

---

## 7. Architectural & Technical Requirements

- **Single Page Application (SPA):**
  - All UI and data flow contained within the React app; no page reloads.
- **Componentization:**
  - Each UI/functionality section is implemented as a clean, modular React component.
- **No Backend:**
  - All data is managed in client memory and localStorage; there are no network requests.
- **Styling:**
  - Style with pure CSS, using variables and semantic class naming from `src/App.css`.
- **No External UI Libraries:**
  - All UI elements (buttons, cards, modals, etc.) are bespoke/vanilla React/CSS.
- **Testing:**
  - (If implemented) tests reside in the `/src` directory and utilize Jest/react-testing-library.

---

## References and Source Files

- `/pocketbalance/src/App.js`: Main app component and structural logic (to be extended for PocketBalance).
- `/pocketbalance/src/App.css`: CSS variable definitions, global and component styling, color palette.
- `/pocketbalance/src/index.js` & `/pocketbalance/src/index.css`: App entry point and index-level styles.
- `/pocketbalance/README.md`: Describes minimal dependency, brand color usage, and organizational structure.

---

## Future Considerations

- Potential future expansion may include data export/import, PWA/offline install support, or themed customization, but these are not required in the MVP/main container.

---

*This requirements document was generated using direct analysis of the codebase, current configuration, and the provided design/feature plan for the PocketBalance React web application main container.*

