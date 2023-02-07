import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";

const PostsList = () => {
    // After creating component, useSelector to reference global state like so.
    const posts = useSelector(selectAllPosts);

    // In this case, map through posts and render information in desired format
    const renderedPosts = posts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userId}/>
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
