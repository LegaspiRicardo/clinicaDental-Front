import React from 'react';
import { Navigate } from 'react-router-dom';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol || '')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
