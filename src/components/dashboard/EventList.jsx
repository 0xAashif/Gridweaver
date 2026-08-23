import { AlertTriangle, Activity, Battery, CheckCircle, Zap } from 'lucide-react';

const mockEvents = [
  { id: 1, time: '11:42 AM', type: 'info', title: 'Grid stabilized', icon: CheckCircle, color: 'text-emerald-400' },
  { id: 2, time: '11:38 AM', type: 'warning', title: 'Grid recovering', icon: Activity, color: 'text-amber-400' },
  { id: 3, time: '11:35 AM', type: 'alert', title: 'Battery BAT-021 started discharging', icon: Battery, color: 'text-rose-400' },
  { id: 4, time: '11:30 AM', type: 'warning', title: 'Solar generation dropped', icon: Zap, color: 'text-amber-400' },
  { id: 5, time: '11:28 AM', type: 'alert', title: 'Grid became unstable', icon: AlertTriangle, color: 'text-rose-400' },
  { id: 6, time: '10:00 AM', type: 'info', title: 'Simulation started', icon: Activity, color: 'text-blue-400' },
];

export default function EventList() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col overflow-hidden shadow-sm">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Recent Events</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {mockEvents.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="flex items-start gap-4 pb-4 border-b border-slate-800/60 last:border-0 last:pb-0">
              <div className="mt-1">
                <Icon className={`w-5 h-5 ${event.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{event.title}</p>
                <span className="text-xs text-slate-500">{event.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
