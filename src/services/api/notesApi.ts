import axiosAPI from 'shared/axios';

export const notesApi = {
	getAll: (params: string) => {
		const url = '/';
		return axiosAPI.get(url, { params });
	},
};
