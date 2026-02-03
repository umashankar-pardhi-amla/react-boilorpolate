/**
 * Base Auth Layout – for authenticated routes.
 * Checks authentication and redirects if not authenticated.
 * Future: can add permission checks here.
 * Override in app/extensions/layouts/AuthLayout.tsx
 */

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../stores/auth-store";

export interface AuthLayoutProps {
  children?: React.ReactNode;
  /**
   * Future: permission requirements
   * Example: { role: 'admin' } or { permission: 'view:dashboard' }
   */
  permissions?: {
    role?: string;
    permission?: string;
  };
}

export function AuthLayout({ children, permissions: _permissions }: AuthLayoutProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
    }
    // Future: check permissions here
    // if (permissions && !hasPermission(user, permissions)) {
    //   navigate('/unauthorized');
    // }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  return <div className="auth-layout">{children || <Outlet />}</div>;
}
