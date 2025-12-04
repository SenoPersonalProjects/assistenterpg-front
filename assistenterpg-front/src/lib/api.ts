const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export type LoginResponse = {
  access_token: string;
  usuario: {
    id: number;
    apelido: string;
    email: string;
  };
};

export async function apiLogin(email: string, senha: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    throw new Error('Falha ao fazer login');
  }

  return res.json();
}

export async function apiRegister(apelido: string, email: string, senha: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apelido, email, senha }),
  });

  if (!res.ok) {
    throw new Error('Falha ao registrar usuário');
  }

  return res.json();
}

export async function apiGetMe(token: string) {
  const res = await fetch(`${API_BASE_URL}/usuarios/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Não autenticado');
  }

  return res.json();
}

/* ---------------- Campanhas ---------------- */

export type CampanhaResumo = {
  id: number;
  nome: string;
  descricao: string | null;
  status: string;
  criadoEm: string;
  dono: { id: number; apelido: string };
  _count: { membros: number; personagens: number; sessoes: number };
};

export async function apiGetMinhasCampanhas(token: string): Promise<CampanhaResumo[]> {
  const res = await fetch(`${API_BASE_URL}/campanhas/minhas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar campanhas');
  }

  return res.json();
}

export async function apiCreateCampanha(
  token: string,
  data: { nome: string; descricao?: string },
): Promise<CampanhaResumo> {
  const res = await fetch(`${API_BASE_URL}/campanhas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Falha ao criar campanha');
  }

  return res.json();
}

/* ------------ Convites de campanha ------------ */

export type ConviteCampanha = {
  id: number;
  campanhaId: number;
  email: string;
  codigo: string;
  status: string;
  criadoEm: string;
  respondidoEm: string | null;
  campanha?: {
    id: number;
    nome: string;
    dono?: { apelido: string };
  };
};

export async function apiCriarConvite(
  token: string,
  campanhaId: number,
  data: { email: string; papel: 'MESTRE' | 'JOGADOR' | 'OBSERVADOR' },
): Promise<ConviteCampanha> {
  const res = await fetch(
    `${API_BASE_URL}/campanhas/${campanhaId}/convites`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error('Falha ao criar convite');
  }

  return res.json();
}

export async function apiListarConvitesPendentes(
  token: string,
): Promise<ConviteCampanha[]> {
  const res = await fetch(`${API_BASE_URL}/campanhas/convites/pendentes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Falha ao carregar convites');
  }

  return res.json();
}

export async function apiAceitarConvite(
  token: string,
  codigo: string,
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/campanhas/convites/${codigo}/aceitar`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Falha ao aceitar convite');
  }
}

export async function apiRecusarConvite(
  token: string,
  codigo: string,
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/campanhas/convites/${codigo}/recusar`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Falha ao recusar convite');
  }
}