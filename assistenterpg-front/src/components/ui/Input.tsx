'use client';

import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-app-fg">{label}</label>}
      <input
        className={`border border-app-border bg-app-surface text-app-fg rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-primary focus:border-app-primary ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-app-danger">{error}</span>}
    </div>
  );
}
