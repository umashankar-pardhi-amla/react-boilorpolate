import type { Route } from './+types/forgot-password';
import { ForgotPassword } from '~/pages';
import { PublicLayout } from '~/layouts';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Forgot password' },
    { name: 'description', content: 'Reset your password' },
  ];
}

export default function ForgotPasswordRoute() {
  return (
    <PublicLayout>
      <ForgotPassword />
    </PublicLayout>
  );
}
