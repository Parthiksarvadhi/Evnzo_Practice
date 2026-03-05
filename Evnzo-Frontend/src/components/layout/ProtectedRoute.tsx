import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export function ProtectedRoute() {
  // Force authentication state to bypass login screen
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
