# REACT QUERY TUTORIAL

A React Query tutorial for managing async state by Kyle Cook (Web Dev Simplified on YouTube)

Tutorial link [HERE](https://www.youtube.com/watch?v=r8Dg0KVnfMA)

## useQuery Basics:

- `queryKey` must be unique for every query you are making.

```
// posts => ["posts"]
// posts/1 => ["posts", post.id ]
// posts?authorId=1 => ["posts" {authorId: 1}]
//posts/2/comments => ["posts", post.id, "comments"]

```

- `queryFn` must always return a Promise because it's for async functions

