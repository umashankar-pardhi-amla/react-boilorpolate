import type { Route } from './+types/dashboard';
import { Dashboard } from '~/pages';
import { AuthLayout } from '~/layouts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'Your dashboard' },
  ];
}

export default function DashboardRoute() {
  return (
    <AuthLayout>
      <Dashboard />
    </AuthLayout>
  );
}
