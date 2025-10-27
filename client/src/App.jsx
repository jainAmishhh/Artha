
// App.jsx
import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout";
import AuthPage from "./components/AuthPage/AuthPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import BudgetDashboard from "./pages/BudgetDashboard/BudgetDashboard";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import ToDoDashboard from "./pages/ToDoDashboard/ToDoDashboard";
import FinancialInsightsDashboard from "./pages/FinancialInsightsDashboard/FinancialInsightsDashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// ✅ ProtectedRoute wrapper
function ProtectedRoute({ auth, children }) {
  if (!auth?.token) {
    return <Navigate to="/authUser" replace />;
  }
  return children;
}

export default function App() {
  // ✅ initialize from localStorage
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  // ✅ whenever auth changes, update localStorage
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // ✅ login handler → receives token + user from AuthPage
  const handleLogin = (data) => {
    setAuth(data); // { token, user }
  };

  // ✅ logout handler
  const handleLogout = () => setAuth(null);

  const router = createBrowserRouter([
    { path: "/authUser", element: <AuthPage onLogin={handleLogin} /> },
    {
      path: "/",
      element: (
        <ProtectedRoute auth={auth}>
          <Layout onLogout={handleLogout} user={auth?.user} />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <UserDashboard /> },
        { path: "budgets", element: <BudgetDashboard /> },
        { path: "transaction", element: <TransactionHistory /> },
        { path: "to-do", element: <ToDoDashboard /> },
        { path: "insights", element: <FinancialInsightsDashboard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

