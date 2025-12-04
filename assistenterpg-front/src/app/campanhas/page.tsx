'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiGetMinhasCampanhas, apiCreateCampanha, CampanhaResumo } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CampaignForm } from '@/components/campanha/CampaignForm';
import { CampaignCard } from '@/components/campanha/CampaignCard';
import { Button } from '@/components/ui/Button';

export default function CampanhasPage() {
  const router = useRouter();
  const { usuario, loading: authLoading } = useAuth();

  const [campanhas, setCampanhas] = useState<CampanhaResumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !usuario) {
      router.push('/auth/login');
      return;
    }

    if (!authLoading && usuario) {
      const token = getToken();
      if (!token) {
        router.push('/auth/login');
        return;
      }

      apiGetMinhasCampanhas(token)
        .then(setCampanhas)
        .catch(() => setErro('Erro ao carregar campanhas'))
        .finally(() => setLoading(false));
    }
  }, [authLoading, usuario, router]);

  async function handleCreate(data: { nome: string; descricao?: string }) {
    const token = getToken();
    if (!token) throw new Error('Sem token');

    const nova = await apiCreateCampanha(token, data);
    setCampanhas(prev => [nova, ...prev]);
  }

  if (authLoading || loading) {
    return <p className="p-6 text-app-fg">Carregando campanhas...</p>;
  }

  if (!usuario) return null;

  return (
    <main className="min-h-screen bg-app-bg p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-app-fg">Minhas campanhas</h1>
          <p className="text-sm text-app-muted">
            Gerencie suas campanhas ativas, pausadas e encerradas.
          </p>
        </div>
      </header>

      <section className="max-w-xl">
        <SectionTitle>Criar nova campanha</SectionTitle>
        <CampaignForm onSubmit={handleCreate} />
      </section>

      <section>
        <SectionTitle>Lista</SectionTitle>
        {erro && <p className="text-sm text-app-danger mb-2">{erro}</p>}
        {campanhas.length === 0 ? (
          <p className="text-sm text-app-muted">
            Você ainda não possui campanhas.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-2">
            {campanhas.map(c => (
              <CampaignCard key={c.id} campanha={c} />
            ))}
          </div>
        )}
      </section>
      <Button variant="ghost" onClick={() => router.push('/')}>
              Voltar para o menu inicial
            </Button>
    </main>
  );
}
