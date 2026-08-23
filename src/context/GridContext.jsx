import { createContext, useState, useEffect, useContext } from 'react';
import * as dashboardService from '../services/dashboardService';
import * as nodeService from '../services/nodeService';
import * as batteryService from '../services/batteryService';
import * as simulationService from '../services/simulationService';

const GridContext = createContext();

export function GridProvider({ children }) {
  const [gridSummary, setGridSummary] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [simulationStatus, setSimulationStatus] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('OFFLINE');

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [summaryData, nodesData, batteriesData, simData, eventsData] = await Promise.all([
        dashboardService.getGridSummary(),
        nodeService.getNodes(),
        batteryService.getBatteries(),
        simulationService.getStatus(),
        dashboardService.getEvents ? dashboardService.getEvents() : Promise.resolve([])
      ]);

      setGridSummary(summaryData);
      setNodes(nodesData || []);
      setBatteries(batteriesData || []);
      setSimulationStatus(simData);
      setEvents(eventsData || []);
      setConnectionStatus('LIVE');
    } catch (err) {
      console.error('Failed to fetch grid data:', err);
      setError('Backend Offline');
      setConnectionStatus('OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Fetch every 3 seconds to fake real-time if websockets aren't present yet
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GridContext.Provider value={{
      gridSummary,
      nodes,
      batteries,
      simulationStatus,
      events,
      loading,
      error,
      connectionStatus,
      refreshData
    }}>
      {children}
    </GridContext.Provider>
  );
}

export function useGrid() {
  return useContext(GridContext);
}
