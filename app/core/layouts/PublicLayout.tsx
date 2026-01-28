/**
 * Base Public Layout – for public routes (login, signup, forgot-password).
 * Redirects to dashboard if already authenticated.
 * Override in app/extensions/layouts/PublicLayout.tsx
 */

import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/auth-store';

export interface PublicLayoutProps {
  children?: React.ReactNode;
  /**
   * If true, redirects authenticated users to dashboard
   * Set to false for pages that should be accessible even when logged in
   */
  redirectIfAuthenticated?: boolean;
}

export function PublicLayout({ children, redirectIfAuthenticated = true }: PublicLayoutProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (redirectIfAuthenticated && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, redirectIfAuthenticated]);

  return (
    <div className="public-layout">
      {children || <Outlet />}
    </div>
  );
}
