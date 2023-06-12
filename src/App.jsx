import { useState } from 'react';
import PostList1 from './PostList1';
import PostList2 from './PostList2';
import Post from './Post';
import CreatePost from './CreatePost';

const App = () => {
	const [currentPage, setCurrentPage] = useState(<PostList1 />);
	return (
		<div>
			<button onClick={() => setCurrentPage(<PostList1 />)}>
				Posts List 1
			</button>
			<button onClick={() => setCurrentPage(<PostList2 />)}>
				Posts List 2
			</button>
			<button onClick={() => setCurrentPage(<Post id={5} />)}>
				First Post
			</button>
			<button
				onClick={() =>
					setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
				}
			>
				New Post
			</button>

			<br />
			{currentPage}
		</div>
	);
};

export default App;
