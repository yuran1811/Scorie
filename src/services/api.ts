import axios from 'axios';

export const getData = async () => {
	const res = await axios.get('');
	return res;
};
