import type { Route } from './+types/dashboard';
import { Dashboard } from '~/pages';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'Your dashboard' },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
