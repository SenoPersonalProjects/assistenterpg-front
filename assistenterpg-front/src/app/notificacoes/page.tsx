'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/lib/auth';
import {
  apiListarConvitesPendentes,
  apiAceitarConvite,
  apiRecusarConvite,
  ConviteCampanha,
} from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function NotificacoesPage() {
  const router = useRouter();
  const { usuario, loading: authLoading } = useAuth();

  const [convites, setConvites] = useState<ConviteCampanha[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !usuario) {
      router.push('/auth/login');
      return;
    }
    if (authLoading || !usuario) return;

    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const token = getToken();
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const data = await apiListarConvitesPendentes(token);
        setConvites(data);
      } catch {
        setErro('Erro ao carregar notificações');
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [authLoading, usuario, router]);

  async function handleAceitar(codigo: string) {
    const token = getToken();
    if (!token) return;
    try {
      await apiAceitarConvite(token, codigo);
      setConvites(prev => prev.filter(c => c.codigo !== codigo));
    } catch {
      // opcional: tratar erro
    }
  }

  async function handleRecusar(codigo: string) {
    const token = getToken();
    if (!token) return;
    try {
      await apiRecusarConvite(token, codigo);
      setConvites(prev => prev.filter(c => c.codigo !== codigo));
    } catch {
      // opcional: tratar erro
    }
  }

  if (authLoading || loading) {
    return <p className="p-6 text-app-fg">Carregando notificações...</p>;
  }

  return (
    <main className="min-h-screen bg-app-bg p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-app-fg">Notificações</h1>
        <p className="text-sm text-app-muted">
          Veja convites pendentes e outras notificações da sua conta.
        </p>
      </header>

      {erro && <p className="text-sm text-app-danger">{erro}</p>}

      {/* Seção de convites de campanha */}
      <section className="space-y-2">
        <SectionTitle>Convites de campanha</SectionTitle>

        {convites.length === 0 ? (
          <p className="text-sm text-app-muted">
            Você não possui convites pendentes.
          </p>
        ) : (
          <div className="space-y-3">
            {convites.map(convite => {
              const data = new Date(convite.criadoEm).toLocaleDateString(
                'pt-BR',
              );
              return (
                <Card key={convite.id} className="flex flex-col gap-2">
                  <p className="text-xs text-app-muted uppercase tracking-wide">
                    Convite de campanha
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-app-fg">
                        {convite.campanha?.nome ?? 'Campanha'}
                      </p>
                      <p className="text-xs text-app-muted">
                        Convite em {data}
                      </p>
                      {convite.campanha?.dono && (
                        <p className="text-xs text-app-muted">
                          Dono: {convite.campanha.dono.apelido}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleAceitar(convite.codigo)}
                    >
                      Aceitar
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRecusar(convite.codigo)}
                    >
                      Recusar
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
