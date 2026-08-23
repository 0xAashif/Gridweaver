import { Sun, AlertTriangle, ShieldCheck, ZapOff } from 'lucide-react';

const mockSolarNodes = [
  { id: 'SOLAR-001', status: 'ACTIVE', power: 4.7, voltage: 231.5, temp: 38.2, lastUpdated: 'Just now' },
  { id: 'SOLAR-002', status: 'WARNING', power: 2.1, voltage: 220.1, temp: 45.1, lastUpdated: '1m ago' },
  { id: 'SOLAR-003', status: 'ACTIVE', power: 4.8, voltage: 232.0, temp: 37.5, lastUpdated: 'Just now' },
  { id: 'SOLAR-004', status: 'FAULT', power: 0.0, voltage: 0.0, temp: 25.0, lastUpdated: '5m ago' },
];

export default function SolarNodes() {
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 font-medium">ACTIVE</span></div>;
      case 'WARNING':
        return <div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><span className="text-amber-400 font-medium">WARNING</span></div>;
      case 'FAULT':
        return <div className="flex items-center gap-2"><ZapOff className="w-4 h-4 text-rose-500" /><span className="text-rose-500 font-medium">FAULT</span></div>;
      default:
        return <span className="text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 flex items-center gap-2">
          <Sun className="w-6 h-6 text-emerald-400" />
          Solar Nodes
        </h1>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Node ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Power Output</th>
                <th className="px-6 py-4 text-right">Voltage</th>
                <th className="px-6 py-4 text-right">Temperature</th>
                <th className="px-6 py-4 text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockSolarNodes.map((node) => (
                <tr key={node.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{node.id}</td>
                  <td className="px-6 py-4">{getStatusDisplay(node.status)}</td>
                  <td className="px-6 py-4 text-right text-slate-300 font-mono">{node.power.toFixed(1)} kW</td>
                  <td className="px-6 py-4 text-right text-slate-300 font-mono">{node.voltage.toFixed(1)} V</td>
                  <td className="px-6 py-4 text-right text-slate-300 font-mono">{node.temp.toFixed(1)} °C</td>
                  <td className="px-6 py-4 text-right text-slate-500">{node.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
