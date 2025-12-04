'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type Props = {
  onSubmit: (data: { nome: string; descricao?: string }) => Promise<void>;
};

export function CampaignForm({ onSubmit }: Props) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }
    setErro(null);
    setCreating(true);
    try {
      await onSubmit({
        nome: nome.trim(),
        descricao: descricao.trim() || undefined,
      });
      setNome('');
      setDescricao('');
    } catch {
      setErro('Erro ao criar campanha');
    } finally {
      setCreating(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Nome da campanha"
          value={nome}
          onChange={e => setNome(e.target.value)}
          error={erro === 'Nome é obrigatório' ? erro : undefined}
        />
        <Input
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        {erro && erro !== 'Nome é obrigatório' && (
          <p className="text-sm text-app-danger">{erro}</p>
        )}
        <Button type="submit" disabled={creating}>
          {creating ? 'Criando...' : 'Criar campanha'}
        </Button>
      </form>
    </Card>
  );
}
  