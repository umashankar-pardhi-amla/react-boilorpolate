/**
 * Index route (/) – shows Login page. Same UI as /login.
 */
import type { Route } from './+types/login-index';
import { Login } from '~/pages';
import { PublicLayout } from '~/layouts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Sign in' },
    { name: 'description', content: 'Sign in to your account' },
  ];
}

export default function LoginIndexRoute() {
  return (
    <PublicLayout>
      <Login />
    </PublicLayout>
  );
}
