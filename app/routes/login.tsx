import type { Route } from './+types/login';
import { Login } from '~/pages';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Sign in' },
    { name: 'description', content: 'Sign in to your account' },
  ];
}

export default function LoginRoute() {
  return <Login />;
}
