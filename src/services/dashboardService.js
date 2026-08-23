import { fetchApi } from './api';

export const getGridSummary = () => fetchApi('/api/grid/summary');
