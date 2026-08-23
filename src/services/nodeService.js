import { fetchApi } from './api';

export const getNodes = () => fetchApi('/api/nodes');
export const getNodeById = (id) => fetchApi(`/api/nodes/${id}`);
