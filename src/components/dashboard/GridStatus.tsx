import { Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

type StatusType = 'STABLE' | 'UNSTABLE' | 'RECOVERING';

interface GridStatusProps {
  status: StatusType;
  generation: number;
  demand: number;
  balance: number;
}

const statusConfig = {
  STABLE: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    indicator: 'bg-emerald-400',
    border: 'border-emerald-500/20',
    icon: ShieldCheck,
    label: 'GRID STABLE'
  },
  UNSTABLE: {
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    indicator: 'bg-rose-500',
    border: 'border-rose-500/20',
    icon: AlertTriangle,
    label: 'GRID UNSTABLE'
  },
  RECOVERING: {
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    indicator: 'bg-amber-400',
    border: 'border-amber-500/20',
    icon: Activity,
    label: 'RECOVERING'
  }
};

export default function GridStatus({ status, generation, demand, balance }: GridStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`border rounded-xl p-6 flex flex-col h-full bg-slate-900 shadow-sm relative overflow-hidden ${config.border}`}>
      {/* Accent left border indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${config.indicator}`}></div>
      
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-lg ${config.bg}`}>
          <Icon className={`w-7 h-7 ${config.color}`} />
        </div>
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">System Status</h2>
          <div className={`text-xl font-bold tracking-wide ${config.color}`}>
            {config.label}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Generation</div>
          <div className="text-2xl font-semibold text-slate-100">
            {generation} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Demand</div>
          <div className="text-2xl font-semibold text-slate-100">
            {demand} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-lg p-4">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Balance</div>
          <div className={`text-2xl font-semibold ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {balance > 0 ? '+' : ''}{balance} <span className="text-sm text-slate-500 font-normal">kW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
