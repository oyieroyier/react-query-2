import { useMutation, useQuery } from '@tanstack/react-query';

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
	const postQuery = useQuery({
		queryKey: ['posts'],
		queryFn: () => wait(1000).then(() => [...POSTS]),
	});

	if (postQuery.isLoading) return <h1>Loading...</h1>;
	if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

	return (
		<>
			{postQuery.data.map((post) => (
				<h1 key={post.id}>{post.title}</h1>
			))}
		</>
	);
}

function wait(duration) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}
export default App;
