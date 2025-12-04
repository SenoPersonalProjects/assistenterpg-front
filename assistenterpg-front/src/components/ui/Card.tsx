'use client';

import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded border border-app-border bg-app-surface shadow-sm p-4 ${className}`}
    >
      {children}
    </div>
  );
}
