'use client';

import React from 'react';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2 className={`text-lg font-semibold mt-6 mb-2 text-app-fg ${className}`}>
      {children}
    </h2>
  );
}
