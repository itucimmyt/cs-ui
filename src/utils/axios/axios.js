import axios from 'axios';

import { configure } from 'axios-hooks';
import LRU from 'lru-cache';

export const client = axios.create({
	baseURL: process.env.REACT_APP_CSAPI_URI_REST,
	headers: { Accept: 'application/json', Authorization: `Bearer ${localStorage.getItem('id_token')}` }
});

const cache = new LRU({ max: 10 });
configure({ client, cache });
