import StatCard from '../components/dashboard/StatCard';
import GridStatus from '../components/dashboard/GridStatus';
import PowerChart from '../components/dashboard/PowerChart';
import EventList from '../components/dashboard/EventList';
import { Sun, Battery, Zap, Activity } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-100 tracking-tight">Dashboard</h1>
      </div>
      
      {/* 4 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard 
          title="Solar Nodes" 
          mainValue="156" 
          icon={Sun}
          items={[
            { label: 'Active', value: '154', statusColor: 'emerald' },
            { label: 'Warning', value: '2', statusColor: 'amber' },
            { label: 'Fault', value: '0', statusColor: 'slate' },
          ]}
        />
        <StatCard 
          title="Batteries" 
          mainValue="42" 
          icon={Battery}
          items={[
            { label: 'Charging', value: '12', statusColor: 'blue' },
            { label: 'Discharging', value: '0', statusColor: 'amber' },
            { label: 'Idle', value: '30', statusColor: 'slate' },
          ]}
        />
        <StatCard 
          title="Generation" 
          mainValue="420 kW" 
          icon={Zap}
          items={[
            { label: 'Trend', value: '+5.2%', statusColor: 'emerald' },
            { label: 'Capacity', value: '85%' },
            { label: 'Peak (Today)', value: '450 kW' },
          ]}
        />
        <StatCard 
          title="Demand" 
          mainValue="380 kW" 
          icon={Activity}
          items={[
            { label: 'Trend', value: '-1.4%', statusColor: 'emerald' },
            { label: 'Load Level', value: 'Normal' },
            { label: 'Peak (Today)', value: '395 kW' },
          ]}
        />
      </div>

      {/* Main Grid Status and Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          {/* Static STABLE data for Phase 2 UI test */}
          <GridStatus 
            status="STABLE" 
            generation={420} 
            demand={380} 
            balance={40} 
          />
        </div>
        <div className="xl:col-span-2">
          <PowerChart />
        </div>
      </div>

      {/* Lower Components */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <EventList />
        </div>
        <div className="border border-slate-800 border-dashed rounded-xl p-6 h-64 flex items-center justify-center text-slate-500 bg-slate-900/20">
          Simulation Control Placeholder
        </div>
      </div>
    </div>
  );
}

