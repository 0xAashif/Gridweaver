export const BASE_URL = 'http://localhost:8080';

// --- DEMO MOCK STATE ---
let mockGridSummary = { generation: 420, demand: 380, balance: 40, status: 'STABLE' };
let mockSimulationStatus = { status: 'RUNNING', mode: 'NORMAL' };

let mockNodes = [
  { id: 'SOLAR-001', status: 'ACTIVE', powerOutput: 4.7, voltage: 231.5, temperature: 38.2, latitude: 23.2500, longitude: 77.4100, lastUpdated: 'Just now' },
  { id: 'SOLAR-002', status: 'ACTIVE', powerOutput: 4.2, voltage: 228.1, temperature: 39.1, latitude: 23.2550, longitude: 77.4150, lastUpdated: 'Just now' },
  { id: 'SOLAR-003', status: 'ACTIVE', powerOutput: 4.8, voltage: 232.0, temperature: 37.5, latitude: 23.2450, longitude: 77.4050, lastUpdated: 'Just now' },
  { id: 'SOLAR-004', status: 'ACTIVE', powerOutput: 4.5, voltage: 230.5, temperature: 38.0, latitude: 23.2400, longitude: 77.3900, lastUpdated: 'Just now' },
  { id: 'SOLAR-005', status: 'ACTIVE', powerOutput: 4.1, voltage: 229.0, temperature: 40.2, latitude: 23.2600, longitude: 77.4200, lastUpdated: 'Just now' }
];

let mockBatteries = [
  { id: 'BAT-001', state: 'IDLE', charge: 85, capacity: 13.5, power: 0, latitude: 23.2520, longitude: 77.4120, lastUpdated: 'Just now' },
  { id: 'BAT-002', state: 'IDLE', charge: 42, capacity: 13.5, power: 0, latitude: 23.2380, longitude: 77.4080, lastUpdated: 'Just now' },
  { id: 'BAT-003', state: 'IDLE', charge: 90, capacity: 27.0, power: 0, latitude: 23.2580, longitude: 77.4180, lastUpdated: 'Just now' },
  { id: 'BAT-004', state: 'IDLE', charge: 65, capacity: 13.5, power: 0, latitude: 23.2620, longitude: 77.4220, lastUpdated: 'Just now' },
  { id: 'BAT-005', state: 'IDLE', charge: 78, capacity: 27.0, power: 0, latitude: 23.2420, longitude: 77.4020, lastUpdated: 'Just now' }
];


let mockEvents = [
  { id: 1, time: '12:00 PM', type: 'info', title: 'System booted', icon: 'CheckCircle', color: 'text-emerald-400' },
  { id: 2, time: '12:05 PM', type: 'info', title: 'Grid stable', icon: 'Activity', color: 'text-emerald-400' },
  { id: 3, time: '12:10 PM', type: 'info', title: 'Solar output nominal', icon: 'Zap', color: 'text-blue-400' },
  { id: 4, time: '12:15 PM', type: 'info', title: 'Battery fully charged', icon: 'Battery', color: 'text-emerald-400' },
];

const getMockResponse = async (endpoint, options) => {
  const method = options.method || 'GET';

  if (method === 'GET') {
    if (endpoint === '/api/events') return mockEvents;
    if (endpoint === '/api/grid/summary') return mockGridSummary;
    if (endpoint === '/api/nodes') return mockNodes;
    if (endpoint === '/api/batteries') return mockBatteries;
    if (endpoint === '/api/simulation/status') return mockSimulationStatus;
    if (endpoint.startsWith('/api/nodes/')) return mockNodes.find(n => n.id === endpoint.split('/').pop());
    if (endpoint.startsWith('/api/batteries/')) return mockBatteries.find(b => b.id === endpoint.split('/').pop());
  }

  if (method === 'POST') {
    if (endpoint === '/api/simulation/start') {
      mockSimulationStatus = { status: 'RUNNING', mode: 'NORMAL' };
      mockGridSummary = { generation: 420, demand: 380, balance: 40, status: 'STABLE' };
      mockBatteries = mockBatteries.map(b => ({ ...b, state: 'IDLE', power: 0 }));

      mockEvents = [
        { id: 8, time: 'Now', type: 'info', title: 'System booted / Reset', icon: 'CheckCircle', color: 'text-emerald-400' },
        { id: 9, time: 'Now', type: 'info', title: 'Grid stable', icon: 'Activity', color: 'text-emerald-400' },
        ...mockEvents.slice(0, 2)
      ];

      return { success: true };
    }
    if (endpoint === '/api/simulation/storm') {
      mockSimulationStatus = { status: 'RUNNING', mode: 'STORM' };
      mockGridSummary = { generation: 120, demand: 380, balance: -260, status: 'UNSTABLE' };
      mockBatteries = mockBatteries.map(b => ({ ...b, state: 'DISCHARGING', power: -5.2 }));

      mockEvents = [
        { id: 5, time: 'Now', type: 'alert', title: 'Grid became unstable', icon: 'AlertTriangle', color: 'text-rose-400' },
        { id: 6, time: 'Now', type: 'warning', title: 'Solar generation dropped', icon: 'Zap', color: 'text-amber-400' },
        { id: 7, time: 'Now', type: 'alert', title: 'Batteries started discharging', icon: 'Battery', color: 'text-rose-400' },
        ...mockEvents.slice(0, 1)
      ];

      return { success: true };
    }
    if (endpoint === '/api/simulation/stop') {
      mockSimulationStatus = { status: 'STOPPED', mode: 'NORMAL' };
      mockGridSummary = { generation: 420, demand: 380, balance: 40, status: 'STABLE' };
      mockBatteries = mockBatteries.map(b => ({ ...b, state: 'IDLE', power: 0 }));

      mockEvents = [
        { id: 8, time: 'Now', type: 'info', title: 'System booted / Reset', icon: 'CheckCircle', color: 'text-emerald-400' },
        { id: 9, time: 'Now', type: 'info', title: 'Grid stable', icon: 'Activity', color: 'text-emerald-400' },
        ...mockEvents.slice(0, 2)
      ];

      return { success: true };
    }
  }

  throw new Error(`Mock endpoint not found: ${method} ${endpoint}`);
};
// -------------------------

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) return null;
    
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.warn(`[Demo Interceptor] Backend offline or request failed. Mocking ${options.method || 'GET'} ${endpoint}`);
    return getMockResponse(endpoint, options);
  }
};
