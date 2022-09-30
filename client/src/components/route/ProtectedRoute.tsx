import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';

interface IProps {
  isAdmin?: boolean;
  children: any;
}

const ProtectedRoute = ({ isAdmin, children }: IProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate replace to="/auth" />;
  if (isAdmin === true && user!.role !== 'admin')
    return <Navigate replace to="/auth" />;

  return children;
};
export default ProtectedRoute;
