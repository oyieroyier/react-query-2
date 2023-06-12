import { useQuery } from '@tanstack/react-query';
import { getPost } from './api/posts';
import { getUser } from './api/users';

const Post = ({ id }) => {
	const postQuery = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPost(id),
	});

	const userQuery = useQuery({
		queryKey: ['users', postQuery?.data?.userId],
		enabled: postQuery?.data?.userId !== null,
		queryFn: () => getUser(postQuery.data.userId),
	});

	if (postQuery.isLoading) return <h1>Loading...</h1>;
	if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;

	return (
		<>
			<h1>{postQuery.data.title}</h1>
			<small>
				{/* {postQuery.data.userId} */}
				{userQuery.isLoading
					? 'Loading...'
					: userQuery.isError
					? 'Error Loading User'
					: userQuery.data.name}
			</small>
			<p>{postQuery.data.body}</p>
		</>
	);
};

export default Post;
