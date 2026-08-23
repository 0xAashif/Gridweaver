const fs = require('fs');

// 1. Update index.css
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace('background-color: #0B0E14;', 'background-color: #070b19;');
css = css.replace('rgba(59, 130, 246, 0.08)', 'rgba(34, 211, 238, 0.08)');
css = css.replace('background: rgba(255, 255, 255, 0.025);', 'background: rgba(16, 24, 40, 0.6);');
css = css.replace('color: #e2e8f0;', 'color: #f8fafc;'); // gw-value to crisp white
css = css.replace(/gw-pill-stable[\s\S]*?}/, 'gw-pill-stable {\n  background: rgba(34, 211, 238, 0.1);\n  border: 1px solid rgba(34, 211, 238, 0.25);\n  color: #22d3ee;\n}');
css = css.replace(/gw-dot-stable[\s\S]*?}/, 'gw-dot-stable {\n  box-shadow: 0 0 8px rgba(34, 211, 238, 0.7);\n  background-color: #22d3ee;\n}');
fs.writeFileSync('src/index.css', css);

// 2. Sidebar.jsx
let sidebar = fs.readFileSync('src/components/layout/Sidebar.jsx', 'utf8');
sidebar = sidebar.replace('bg-slate-800 text-blue-400', 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 shadow-[inset_-4px_0_15px_rgba(34,211,238,0.1)]');
sidebar = sidebar.replace('text-blue-500', 'text-cyan-400');
fs.writeFileSync('src/components/layout/Sidebar.jsx', sidebar);

// 3. SimulationControl.jsx
let simControl = fs.readFileSync('src/components/dashboard/SimulationControl.jsx', 'utf8');
const oldStart = 'bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm';
const newStart = 'bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-medium rounded-lg transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)] disabled:opacity-50';
simControl = simControl.replace(oldStart, newStart);
simControl = simControl.replace('bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors shadow-sm', newStart);
fs.writeFileSync('src/components/dashboard/SimulationControl.jsx', simControl);

// 4. Header.jsx
let header = fs.readFileSync('src/components/layout/Header.jsx', 'utf8');
header = header.replace('border-emerald-500/30', 'border-cyan-500/30');
header = header.replace('bg-emerald-500 animate-pulse', 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]');
fs.writeFileSync('src/components/layout/Header.jsx', header);

// 5. Dashboard.jsx (StatCard colors)
let dashboard = fs.readFileSync('src/pages/Dashboard.jsx', 'utf8');
dashboard = dashboard.replace(/statusColor: 'emerald'/g, "statusColor: 'cyan'");
dashboard = dashboard.replace(/text-emerald-400/g, "text-cyan-400");
fs.writeFileSync('src/pages/Dashboard.jsx', dashboard);

// 6. StatCard.tsx (add cyan to colorMap)
let statCard = fs.readFileSync('src/components/dashboard/StatCard.tsx', 'utf8');
statCard = statCard.replace("emerald: 'text-emerald-400',", "emerald: 'text-emerald-400',\n  cyan: 'text-cyan-400',");
fs.writeFileSync('src/components/dashboard/StatCard.tsx', statCard);

// 7. EventList.jsx (colors)
let eventList = fs.readFileSync('src/components/dashboard/EventList.jsx', 'utf8');
eventList = eventList.replace(/text-emerald-400/g, 'text-cyan-400');
fs.writeFileSync('src/components/dashboard/EventList.jsx', eventList);

// 8. SolarNodes & Batteries (Status colors)
const replaceStatusColors = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/emerald/g, 'cyan');
  fs.writeFileSync(file, content);
};
replaceStatusColors('src/pages/SolarNodes.jsx');
replaceStatusColors('src/pages/Batteries.jsx');
replaceStatusColors('src/components/map/SolarMarker.jsx');
replaceStatusColors('src/components/map/BatteryMarker.jsx');

