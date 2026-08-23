import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'Grid Overview',
  '/map': 'Grid Map',
  '/nodes': 'Solar Nodes',
  '/batteries': 'Batteries',
  '/events': 'System Events',
  '/simulation': 'Simulation Control',
};

export default function Header() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'GridWeaver';

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 flex-shrink-0">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Live</span>
        </div>
      </div>
    </header>
  );
}
