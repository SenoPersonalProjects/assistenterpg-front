'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function RegisterForm() {
  const { register, loading } = useAuth();
  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSubmitting(true);
    try {
      await register(apelido, email, senha);
    } catch {
      setErro('Erro ao registrar (email pode já estar em uso)');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold mb-2">Criar conta</h1>
      <Input
        label="Apelido"
        value={apelido}
        onChange={e => setApelido(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        label="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      {erro && <p className="text-sm text-red-600">{erro}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Criando...' : 'Criar conta'}
      </Button>
    </form>
  );
}
