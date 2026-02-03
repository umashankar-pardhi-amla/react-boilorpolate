import type { Route } from './+types/login';
import { Login } from '~/pages';
import { PublicLayout } from '~/layouts';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Sign in' },
    { name: 'description', content: 'Sign in to your account' },
  ];
}

export default function LoginRoute() {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}
