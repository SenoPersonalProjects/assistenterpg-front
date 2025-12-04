'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base =
    'px-4 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<typeof variant, string> = {
    primary: 'bg-app-primary text-app-fg hover:bg-app-primary-hover',
    secondary:
      'bg-app-surface text-app-fg hover:bg-app-secondary-hover border border-app-border',
    ghost: 'bg-transparent text-app-primary hover:bg-app-surface',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
