import { Sun, AlertTriangle, ShieldCheck, ZapOff } from 'lucide-react';
import { useGrid } from '../context/GridContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function SolarNodes() {
  const { nodes, loading, error, refreshData } = useGrid();

  if (loading && nodes.length === 0) return <Loading message="Loading solar nodes..." />;
  if (error && nodes.length === 0) return <ErrorMessage message="Backend Offline" onRetry={refreshData} />;

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
      
      {nodes.length === 0 ? (
        <div className="p-8 border border-slate-800 border-dashed rounded-xl flex items-center justify-center text-slate-500">
          No solar nodes available.
        </div>
      ) : (
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
                {nodes.map((node) => (
                  <tr key={node.id || node.nodeId} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-200">{node.id || node.nodeId}</td>
                    <td className="px-6 py-4">{getStatusDisplay(node.status)}</td>
                    <td className="px-6 py-4 text-right text-slate-300 font-mono">{(node.powerOutput || node.power || 0).toFixed(1)} kW</td>
                    <td className="px-6 py-4 text-right text-slate-300 font-mono">{(node.voltage || 0).toFixed(1)} V</td>
                    <td className="px-6 py-4 text-right text-slate-300 font-mono">{(node.temperature || 0).toFixed(1)} °C</td>
                    <td className="px-6 py-4 text-right text-slate-500">{node.lastUpdated || 'Recently'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
