// src/App.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// importing layout
import Layout from "./Layout";

// authentication page
import AuthPage from './components/AuthPage/AuthPage'

import UserDashboard from "./pages/UserDashboard/UserDashboard";
import BudgetDashboard from "./pages/BudgetDashboard/BudgetDashboard";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";
import ToDoDashboard from "./pages/ToDoDashboard/ToDoDashboard";
import FinancialInsightsDashboard from "./pages/FinancialInsightsDashboard/FinancialInsightsDashboard";
import ErrorPage from "./pages/ErrorPage/ErrorPage"; // optional

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, // optional
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "authUser", element: <AuthPage /> },
      { path: "budgets", element: <BudgetDashboard /> },
      { path: "transaction", element: <TransactionHistory /> },
      { path: "to-do", element: <ToDoDashboard /> },
      { path: "insights", element: <FinancialInsightsDashboard /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
