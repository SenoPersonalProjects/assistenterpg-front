'use client';

import React from 'react';

type BadgeColor = 'gray' | 'green' | 'red' | 'blue' | 'yellow' | 'purple';
type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  className?: string;
};

export function Badge({
  children,
  color = 'gray',
  size = 'md',
  className = '',
}: BadgeProps) {
  const colors: Record<BadgeColor, string> = {
    gray: 'bg-app-surface text-app-muted border border-app-border',
    green: 'bg-green-500/10 text-green-400',
    red: 'bg-app-danger/10 text-app-danger',
    blue: 'bg-app-primary/10 text-app-primary',
    yellow: 'bg-yellow-500/10 text-yellow-400',
    purple: 'bg-purple-500/10 text-purple-300',
  };

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${sizes[size]} ${colors[color]} ${className}
      `}
    >
      {children}
    </span>
  );
}
