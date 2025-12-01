import { AlertCircle, CheckCircle2, Radio, Trash2 } from 'lucide-react';

export const Mapstats = [
  {
    label: 'Critical Alerts',
    value: '12',
    icon: AlertCircle,
    color: 'error',
    bgColor: 'text-error',
    position: { x: 30, y: 25 }, //Gps cordinates on the map
    count: 12,
  },

  {
    label: 'Not responding',
    value: '5',
    icon: Radio,
    color: 'warning',
    bgColor: 'bg-warning',
    position: { x: 65, y: 40 },
    count: 5,
  },

  {
    labe: 'Needs Evacution',
    value: '23',
    icon: Trash2,
    color: 'accent',
    bgColor: 'bg-accentBg',
    textColor: 'text-accent',
    position: { x: 50, y: 65 },
    count: 23,
  },

  {
    label: 'available',
    value: '156',
    icon: CheckCircle2,
    color: 'success',
    bgColor: 'bg-successBg',
    textColor: 'text-success',
    position: { x: 80, y: 55 },
    count: 156,
  },
];
