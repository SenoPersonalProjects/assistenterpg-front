'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UserAvatarButton } from './UserAvatarButton';
import { ThemeToggle } from './ThemeToggle';
import { NotificationsButton } from './NotificationsButton';

export function UserMenu() {
  const { usuario, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!usuario) return null;

  return (
    <div className="relative">
      <UserAvatarButton
        apelido={usuario.apelido}
        onClick={() => setOpen(o => !o)}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-64 z-20">
          <Card className="space-y-3">
            <div>
              <p className="font-semibold text-app-fg">{usuario.apelido}</p>
              <p className="text-xs text-app-muted">{usuario.email}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-app-muted">Tema</span>
              <ThemeToggle />
            </div>

            {/* Botão genérico de notificações com sino */}
            <NotificationsButton pendingNotifications={0} className="w-full justify-start" />

            <div className="flex gap-2 items-center">
              <Badge color="blue">Beta</Badge>
              <span className="text-xs text-app-muted">
                Assistente RPG
              </span>
            </div>

            <Button
              variant="secondary"
              onClick={logout}
              className="w-full"
            >
              Sair
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
