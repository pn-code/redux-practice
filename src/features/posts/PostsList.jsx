import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
    // After creating component, useSelector to reference global state like so.
    const posts = useSelector(selectAllPosts);

    // Filter method to order posts
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    // In this case, map through posts and render information in desired format
    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    ));

    return (
        <div>
            <h2>Posts</h2>
            {renderedPosts}
        </div>
    );
};

export default PostsList;
