import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ childer }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />
    }

  return childer;
}

export default ProtectedRoute;