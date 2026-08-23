import { Battery, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

const mockBatteries = [
  { id: 'BAT-001', state: 'IDLE', charge: 85, capacity: 13.5, power: 0, lastUpdated: 'Just now' },
  { id: 'BAT-002', state: 'DISCHARGING', charge: 42, capacity: 13.5, power: -4.2, lastUpdated: 'Just now' },
  { id: 'BAT-003', state: 'CHARGING', charge: 20, capacity: 27.0, power: 3.5, lastUpdated: '1m ago' },
  { id: 'BAT-004', state: 'FAULT', charge: 0, capacity: 13.5, power: 0, lastUpdated: '10m ago' },
];

export default function Batteries() {
  const getStateDisplay = (state) => {
    switch (state) {
      case 'IDLE':
        return <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-slate-400" /><span className="text-slate-300 font-medium">IDLE</span></div>;
      case 'CHARGING':
        return <div className="flex items-center gap-2"><Battery className="w-4 h-4 text-blue-400" /><span className="text-blue-400 font-medium">CHARGING</span></div>;
      case 'DISCHARGING':
        return <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400 animate-pulse" /><span className="text-amber-400 font-medium tracking-wide">DISCHARGING</span></div>;
      case 'FAULT':
        return <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-500" /><span className="text-rose-500 font-medium">FAULT</span></div>;
      default:
        return <span className="text-slate-400">{state}</span>;
    }
  };

  const getChargeBar = (charge, state) => {
    let color = 'bg-slate-400';
    if (state === 'CHARGING') color = 'bg-blue-400';
    if (state === 'DISCHARGING') color = 'bg-amber-400';
    if (state === 'FAULT') color = 'bg-rose-500';

    return (
      <div className="flex items-center gap-3 justify-end">
        <span className="text-slate-300 font-mono w-8">{charge}%</span>
        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${charge}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
          <Battery className="w-6 h-6 text-blue-400" />
          Battery Units
        </h1>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Battery ID</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4 text-right">Charge Level</th>
                <th className="px-6 py-4 text-right">Capacity</th>
                <th className="px-6 py-4 text-right">Power Flow</th>
                <th className="px-6 py-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockBatteries.map((bat) => (
                <tr key={bat.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{bat.id}</td>
                  <td className="px-6 py-4">{getStateDisplay(bat.state)}</td>
                  <td className="px-6 py-4">{getChargeBar(bat.charge, bat.state)}</td>
                  <td className="px-6 py-4 text-right text-slate-300 font-mono">{bat.capacity.toFixed(1)} kWh</td>
                  <td className="px-6 py-4 text-right font-mono">
                    <span className={bat.power > 0 ? 'text-blue-400' : bat.power < 0 ? 'text-amber-400' : 'text-slate-400'}>
                      {bat.power > 0 ? '+' : ''}{bat.power.toFixed(1)} kW
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">{bat.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
