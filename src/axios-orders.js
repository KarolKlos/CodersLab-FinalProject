import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://black-market-8b185.firebaseio.com/'
});

export default instance;