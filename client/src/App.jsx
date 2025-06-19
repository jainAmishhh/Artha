// src/App.jsx
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budget from "./pages/Budget/Budget";
import Transaction from "./pages/Transaction/Transaction";
import ToDo from "./pages/ToDo/ToDo";
import Insights from "./pages/Insights/Insights";
import ErrorPage from "./pages/ErrorPage/ErrorPage"; // optional

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, // optional
    children: [
      { index: true, element: <Dashboard /> },
      { path: "budgets", element: <Budget /> },
      { path: "transaction", element: <Transaction /> },
      { path: "to-do", element: <ToDo /> },
      { path: "insights", element: <Insights /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
