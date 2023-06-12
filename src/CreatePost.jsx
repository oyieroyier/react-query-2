import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post';

const CreatePost = ({ setCurrentPage }) => {
	const titleRef = useRef();
	const bodyRef = useRef();
	const queryClient = useQueryClient();
	const createPostMutation = useMutation({
		// You only need one function for useMutation, mutationFn. It must return a Promise
		mutationFn: createPost,
		onSuccess: (data) => {
			queryClient.setQueryData(['posts', data.id], data);
			queryClient.invalidateQueries(['posts']);
			setCurrentPage(<Post id={data.id} />);
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		/*
		
		const title = titleRef.current.value;
		const body = bodyRef.current.value;
		
		*/

		createPostMutation.mutate({
			title: titleRef.current.value,
			body: bodyRef.current.value,
		});
	}
	return (
		<div>
			{createPostMutation.isError && JSON.stringify(createPostMutation.error)}
			<h1>Create Post</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input type="text" id="title" ref={titleRef} />
				</div>
				<div>
					<label htmlFor="body">Body</label>
					<input id="body" ref={bodyRef} />
				</div>
				<button disabled={createPostMutation.isLoading}>
					{createPostMutation.isLoading ? 'Loading...' : 'Create Post'}
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
