'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/lib/auth';
import { apiCriarConvite } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { CampaignHeader } from '@/components/campanha/CampaignHeader';
import { CampaignMembersSection } from '@/components/campanha/CampaignMembersSection';
import { CampaignSessionsPlaceholder } from '@/components/campanha/CampaignSessionsPlaceholder';
import { InviteMemberForm } from '@/components/campanha/InviteMemberForm';

type MembroCampanhaDto = {
  id: number;
  papel: string;
  usuarioId: number;
  usuario: { id: number; apelido: string };
};

type CampanhaDetalheDto = {
  id: number;
  nome: string;
  descricao: string | null;
  status: string;
  criadoEm: string;
  donoId: number;
  dono: { id: number; apelido: string };
  membros: MembroCampanhaDto[];
  _count: { membros: number; personagens: number; sessoes: number };
};

export default function CampanhaDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { usuario, loading: authLoading } = useAuth();

  const [campanha, setCampanha] = useState<CampanhaDetalheDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !usuario) {
      router.push('/auth/login');
      return;
    }
    if (!id || authLoading || !usuario) return;

    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/campanhas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error('Falha ao carregar campanha');
        }
        const data = (await res.json()) as CampanhaDetalheDto;
        setCampanha(data);
      } catch {
        setErro('Erro ao carregar campanha');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id, authLoading, usuario, router]);

  async function handleInvite(data: {
    email: string;
    papel: 'MESTRE' | 'JOGADOR' | 'OBSERVADOR';
  }) {
    const token = getToken();
    if (!token || !campanha) {
      throw new Error('Sem token ou campanha');
    }

    // só deixa o dono convidar (opcional, mas recomendado)
    if (usuario?.id !== campanha.donoId) {
      throw new Error('Apenas o dono pode enviar convites');
    }

    await apiCriarConvite(token, campanha.id, data);
  }


  if (loading) {
    return <p className="p-6 text-app-fg">Carregando campanha...</p>;
  }

  if (!campanha) {
    return (
      <main className="min-h-screen bg-app-bg p-6">
        <p className="text-app-danger">{erro ?? 'Campanha não encontrada'}</p>
        <Button variant="ghost" onClick={() => router.push('/campanhas')}>
          Voltar
        </Button>
      </main>
    );
  }

  const dataCriacao = new Date(campanha.criadoEm).toLocaleDateString('pt-BR');

  return (
    <main className="min-h-screen bg-app-bg p-6 space-y-6">
      <CampaignHeader
        nome={campanha.nome}
        donoApelido={campanha.dono.apelido}
        criadoEm={dataCriacao}
        totalPersonagens={campanha._count.personagens}
        totalSessoes={campanha._count.sessoes}
        status={campanha.status}
      />

      <SectionTitle>Descrição</SectionTitle>
      {campanha.descricao && (
        <Card>
          <p className="text-sm text-app-muted">{campanha.descricao}</p>
        </Card>
      )}

      <CampaignMembersSection membros={campanha.membros} donoId={campanha.donoId} />

      {usuario?.id === campanha.donoId && (
        <section>
          <SectionTitle>Convidar jogador</SectionTitle>
          <InviteMemberForm onInvite={handleInvite} />
        </section>
      )}

      <CampaignSessionsPlaceholder />

      <Button variant="ghost" onClick={() => router.push('/campanhas')}>
        Voltar para campanhas
      </Button>
    </main>
  );
}
