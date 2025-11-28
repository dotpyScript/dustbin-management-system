// File: Components/Data/kpiData.js

import {
  Trash,
  Map,
  Users,
  Activity,
  AlertCircle,
  Battery,
  Zap,
} from 'lucide-react';

// ============================================
// PRIMARY KPI DATA
// ============================================
export const kpiData = [
  {
    title: 'Total Bins',
    value: '1,247',
    icon: Trash,
    color: 'accent',
    trend: 'up',
    trendValue: 12,
    description: 'Active bins in system',
  },
  {
    title: 'Active Zones',
    value: '42',
    icon: Map,
    color: 'success',
    trend: 'up',
    trendValue: 8,
    description: 'Zones currently monitored',
  },
  {
    title: 'Total Users',
    value: '156',
    icon: Users,
    color: 'info',
    trend: 'down',
    trendValue: 5,
    description: 'Registered users',
  },
  {
    title: 'System Health',
    value: '98.5',
    unit: '%',
    icon: Activity,
    color: 'success',
    trend: 'up',
    trendValue: 2,
    description: 'Overall system uptime',
  },
];

// ============================================
// SECONDARY STATS DATA
// ============================================
export const secondaryStats = [
  {
    title: 'Critical Alerts',
    value: '3',
    icon: AlertCircle,
    color: 'error',
    trend: 'up',
    trendValue: 1,
    description: 'Bins requiring maintenance',
  },
  {
    title: 'Battery Status',
    value: '87',
    unit: '%',
    icon: Battery,
    color: 'warning',
    trend: 'down',
    trendValue: 4,
    description: 'Average bin battery level',
  },
  {
    title: 'Data Processed',
    value: '2.4',
    unit: 'TB',
    icon: Zap,
    color: 'accent',
    trend: 'up',
    trendValue: 15,
    description: "Today's data usage",
  },
];
