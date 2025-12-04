'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { UserMenu } from '@/components/layout/UserMenu';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function HomePage() {
  const { usuario, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !usuario) {
      router.push('/auth/login');
    }
  }, [loading, usuario, router]);

  if (loading) return <p className="p-8 text-app-fg">Carregando...</p>;
  if (!usuario) return null;

  return (
    <main className="min-h-screen bg-app-bg p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-app-fg">Assistente RPG</h1>
          <p className="text-sm text-app-muted">
            Bem-vindo, {usuario.apelido}
          </p>
        </div>
        <UserMenu />
      </header>

      <SectionTitle>Painel inicial</SectionTitle>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
        <Card>
          <h3 className="font-semibold mb-1 text-app-fg">Minhas campanhas</h3>
          <p className="text-sm text-app-muted mb-3">
            Ver e gerenciar as campanhas em que você participa.
          </p>
          <Button onClick={() => router.push('/campanhas')}>
            Ir para campanhas
          </Button>
        </Card>

        <Card>
          <h3 className="font-semibold mb-1 text-app-fg">Personagens</h3>
          <p className="text-sm text-app-muted mb-3">
            Criar e editar fichas de personagem base.
          </p>
          <Button onClick={() => router.push('/personagens')}>
            Ver personagens
          </Button>
        </Card>

        <Card>
          <h3 className="font-semibold mb-1 text-app-fg">Configurações</h3>
          <p className="text-sm text-app-muted mb-3">
            Ajustar preferências da conta e do assistente.
          </p>
          <Button onClick={() => router.push('/config')}>
            Abrir configurações
          </Button>
        </Card>
      </div>
    </main>
  );
}
