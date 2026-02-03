import type { Route } from './+types/dashboard';
import { Dashboard } from '~/pages';
import { AuthLayoutWithSidebar } from '~/layouts';
import { Menu } from '~/components';
import { defaultMenuItems } from '~/core/config/menu';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'Your dashboard' },
  ];
}

export default function DashboardRoute() {
  return (
    <AuthLayoutWithSidebar
      menuItems={<Menu items={defaultMenuItems} />}
      sidebarLogo={<div className="font-bold text-lg">App</div>}
      headerTitle="Dashboard"
    >
      <Dashboard />
    </AuthLayoutWithSidebar>
  );
}
