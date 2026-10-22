import React from 'react';
import { Info } from 'lucide-react';

interface DemoBadgeProps {
  label?: string;
  tooltip?: string;
  className?: string;
}

export function DemoBadge({
  label = 'Demo content — pending clinic verification',
  tooltip = 'This content is illustrative demo data. Actual clinic records and credentials will be confirmed before production launch.',
  className = '',
}: DemoBadgeProps) {
  return (
    <span
      title={tooltip}
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/80 ${className}`}
    >
      <Info className="w-3 h-3 text-amber-600 flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}
