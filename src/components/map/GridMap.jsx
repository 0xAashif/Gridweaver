import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SolarMarker from './SolarMarker';
import BatteryMarker from './BatteryMarker';

const mockSolarNodes = [
  { id: 'SOLAR-001', lat: 40.7128, lng: -74.0060, status: 'ACTIVE', power: 4.7, voltage: 231.5, temperature: 38.2 },
  { id: 'SOLAR-002', lat: 40.7228, lng: -73.9960, status: 'WARNING', power: 2.1, voltage: 220.1, temperature: 45.1 },
  { id: 'SOLAR-003', lat: 40.7150, lng: -73.9800, status: 'ACTIVE', power: 4.8, voltage: 232.0, temperature: 37.5 },
  { id: 'SOLAR-004', lat: 40.7050, lng: -74.0150, status: 'FAULT', power: 0.0, voltage: 0.0, temperature: 25.0 },
];

const mockBatteries = [
  { id: 'BAT-001', lat: 40.7158, lng: -74.0160, state: 'IDLE', charge: 85, capacity: 13.5 },
  { id: 'BAT-002', lat: 40.7028, lng: -74.0100, state: 'DISCHARGING', charge: 42, capacity: 13.5 },
  { id: 'BAT-003', lat: 40.7258, lng: -73.9850, state: 'CHARGING', charge: 20, capacity: 27.0 },
];

export default function GridMap() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 relative z-0" style={{ isolation: 'isolate' }}>
      <MapContainer 
        center={[40.7128, -74.0060]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {mockSolarNodes.map(node => (
          <SolarMarker key={node.id} node={node} />
        ))}
        {mockBatteries.map(bat => (
          <BatteryMarker key={bat.id} battery={bat} />
        ))}
      </MapContainer>
    </div>
  );
}
