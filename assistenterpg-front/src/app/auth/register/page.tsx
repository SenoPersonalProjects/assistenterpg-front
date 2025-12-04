'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Card } from '@/components/ui/Card';
import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Card>
        <RegisterForm />
        <p className="mt-4 text-sm">
          Já tem conta?{' '}
          <Link href="/auth/login" className="text-blue-600">
            Entrar
          </Link>
        </p>
      </Card>
    </AuthLayout>
  );
}
