export const BASE_URL = 'http://localhost:8080';

// --- DEMO MOCK STATE ---
let mockGridSummary = { generation: 420, demand: 380, balance: 40, status: 'STABLE' };
let mockSimulationStatus = { status: 'RUNNING', mode: 'NORMAL' };

let mockNodes = [
  { id: 'SOLAR-001', status: 'ACTIVE', powerOutput: 4.7, voltage: 231.5, temperature: 38.2, latitude: 40.7128, longitude: -74.0060, lastUpdated: 'Just now' },
  { id: 'SOLAR-002', status: 'ACTIVE', powerOutput: 4.2, voltage: 228.1, temperature: 39.1, latitude: 40.7228, longitude: -73.9960, lastUpdated: 'Just now' },
  { id: 'SOLAR-003', status: 'ACTIVE', powerOutput: 4.8, voltage: 232.0, temperature: 37.5, latitude: 40.7150, longitude: -73.9800, lastUpdated: 'Just now' },
  { id: 'SOLAR-004', status: 'ACTIVE', powerOutput: 4.5, voltage: 230.5, temperature: 38.0, latitude: 40.7050, longitude: -74.0150, lastUpdated: 'Just now' },
  { id: 'SOLAR-005', status: 'ACTIVE', powerOutput: 4.1, voltage: 229.0, temperature: 40.2, latitude: 40.7300, longitude: -74.0000, lastUpdated: 'Just now' }
];

let mockBatteries = [
  { id: 'BAT-001', state: 'IDLE', charge: 85, capacity: 13.5, power: 0, latitude: 40.7158, longitude: -74.0160, lastUpdated: 'Just now' },
  { id: 'BAT-002', state: 'IDLE', charge: 42, capacity: 13.5, power: 0, latitude: 40.7028, longitude: -74.0100, lastUpdated: 'Just now' },
  { id: 'BAT-003', state: 'IDLE', charge: 90, capacity: 27.0, power: 0, latitude: 40.7258, longitude: -73.9850, lastUpdated: 'Just now' },
  { id: 'BAT-004', state: 'IDLE', charge: 65, capacity: 13.5, power: 0, latitude: 40.7350, longitude: -73.9900, lastUpdated: 'Just now' },
  { id: 'BAT-005', state: 'IDLE', charge: 78, capacity: 27.0, power: 0, latitude: 40.7100, longitude: -73.9950, lastUpdated: 'Just now' }
];

const getMockResponse = async (endpoint, options) => {
  const method = options.method || 'GET';

  if (method === 'GET') {
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
      return { success: true };
    }
    if (endpoint === '/api/simulation/storm') {
      mockSimulationStatus = { status: 'RUNNING', mode: 'STORM' };
      mockGridSummary = { generation: 120, demand: 380, balance: -260, status: 'UNSTABLE' };
      mockBatteries = mockBatteries.map(b => ({ ...b, state: 'DISCHARGING', power: -5.2 }));
      return { success: true };
    }
    if (endpoint === '/api/simulation/stop') {
      mockSimulationStatus = { status: 'STOPPED', mode: 'NORMAL' };
      mockGridSummary = { generation: 420, demand: 380, balance: 40, status: 'STABLE' };
      mockBatteries = mockBatteries.map(b => ({ ...b, state: 'IDLE', power: 0 }));
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
