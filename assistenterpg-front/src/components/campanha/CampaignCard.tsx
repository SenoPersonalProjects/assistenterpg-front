'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { CampanhaResumo } from '@/lib/api';

type Props = {
  campanha: CampanhaResumo;
};

export function CampaignCard({ campanha }: Props) {
  const router = useRouter();

  const corStatus =
    campanha.status === 'ATIVA'
      ? 'green'
      : campanha.status === 'PAUSADA'
      ? 'yellow'
      : 'red';

  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-app-fg">{campanha.nome}</h3>
        <Badge color={corStatus}>{campanha.status}</Badge>
      </div>
      {campanha.descricao && (
        <p className="text-sm text-app-muted line-clamp-3">
          {campanha.descricao}
        </p>
      )}
      <p className="text-xs text-app-muted">
        Dono: {campanha.dono.apelido} · Membros: {campanha._count.membros} · Sessões:{' '}
        {campanha._count.sessoes}
      </p>
      <Button
        variant="ghost"
        className="mt-1 self-start"
        onClick={() => router.push(`/campanhas/${campanha.id}`)}
      >
        Abrir campanha
      </Button>
    </Card>
  );
}
