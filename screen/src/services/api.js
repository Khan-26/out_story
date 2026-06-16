import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

export const fetchTimeline = () => api.get('/story/timeline');
export const fetchMeta     = () => api.get('/story/meta');
export const fetchEvent    = (id) => api.get(`/story/event/${id}`);

export const getImageUrl = (filename) => `/images/${filename}`;
