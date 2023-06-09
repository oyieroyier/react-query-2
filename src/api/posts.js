import axios from 'axios';

export const getPosts = () => {
	return axios
		.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_sort: 'title',
			},
		})
		.then((res) => res.data);
};
