import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext);

  if (userToken || localStorage.getItem('userToken')) {
    return children;
  }

  return <Navigate to={'/login'} />;
}
