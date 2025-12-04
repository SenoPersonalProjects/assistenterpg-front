'use client';

import { Button } from '@/components/ui/Button';

type Props = {
  apelido: string;
  onClick: () => void;
};

export function UserAvatarButton({ apelido, onClick }: Props) {
  const initial = apelido.charAt(0).toUpperCase();

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-app-primary text-app-fg text-sm">
        {initial}
      </span>
      <span className="hidden sm:inline text-sm">{apelido}</span>
    </Button>
  );
}
