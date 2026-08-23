import { Play, CloudLightning, Square, RotateCcw } from 'lucide-react';

export default function Simulation() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Simulation Control</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Current State</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulation Status</span>
              <span className="font-medium text-emerald-400">RUNNING</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulation Mode</span>
              <span className="font-medium text-slate-200">NORMAL</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
              <span className="text-slate-400">Simulated Nodes</span>
              <span className="font-medium text-slate-200">156</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-400">Grid State</span>
              <span className="font-medium text-emerald-400">STABLE</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Storm Scenario</h3>
          <div className="prose prose-invert prose-sm text-slate-300">
            <p>
              A sudden storm reduces solar generation across the grid. The backend detects grid instability and automatically triggers battery discharge to support grid recovery.
            </p>
            <p className="mt-4 text-slate-400">
              Click <strong>START STORM</strong> below to observe the real-time telemetry changes, battery state shifts, and eventual grid stabilization.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Controls</h3>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm">
            <Play className="w-5 h-5" />
            START SIMULATION
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-sm">
            <CloudLightning className="w-5 h-5" />
            START STORM
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors shadow-sm">
            <Square className="w-5 h-5" />
            STOP SIMULATION
          </button>
          <div className="flex-1 min-w-[20px]"></div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5" />
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
