import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const POSTS = [
	{
		id: 1,
		title: 'Hello World',
		body: 'This is a post',
	},
	{
		id: 2,
		title: 'Hello World 2',
		body: 'This is a post',
	},
];

function App() {
	// Basic query. Use useQuery
	console.log(POSTS);

	const queryClient = useQueryClient();
	const postQuery = useQuery({
		queryKey: ['posts'],
		queryFn: () => wait(1000).then(() => [...POSTS]),
	});

	// Basic mutation. Use useMutation.
	const newPostMutation = useMutation({
		mutationFn: (title) =>
			wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
		// Invalidates the old POSTS and refetches the new state pf POSTS
		onSuccess: () => {
			queryClient.invalidateQueries(['posts']);
		},
	});
	if (postQuery.isLoading) return <h1>Loading...</h1>;
	if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

	return (
		<>
			{postQuery.data.map((post) => (
				<h1 key={post.id}>{post.title}</h1>
			))}
			<button
				disabled={newPostMutation.isLoading}
				onClick={() => newPostMutation.mutate('New Post')}
			>
				Add New
			</button>
		</>
	);
}

function wait(duration) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}
export default App;
