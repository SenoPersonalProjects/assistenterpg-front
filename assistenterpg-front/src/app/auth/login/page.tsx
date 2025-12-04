'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Card } from '@/components/ui/Card';
import { LoginForm } from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card>
        <LoginForm />
        <p className="mt-4 text-sm">
          Não tem conta?{' '}
          <Link href="/auth/register" className="text-blue-600">
            Registrar
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
