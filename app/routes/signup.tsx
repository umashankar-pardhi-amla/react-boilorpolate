import type { Route } from './+types/signup';
import { Signup } from '~/pages';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create account' },
    { name: 'description', content: 'Create a new account' },
  ];
}

export default function SignupRoute() {
  return <Signup />;
}
