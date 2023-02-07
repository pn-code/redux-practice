import React, { useState } from "react";

const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div>
            <h2>Add a New Post</h2>
            <form>
                <div>
                    <label htmlFor="postTitle">Post Title:</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        id="postTitle"
                        name="postTitle"
                        value={title}
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="postContent">Post Content:</label>
                    <input
                        onChange={(e) => setContent(e.target.value)}
                        id="postContent"
                        name="postContent"
                        value={content}
                        type="text"
                    />
                </div>
                <div>
                    <button type="button">Submit Post</button>
                </div>
            </form>
        </div>
    );
};

export default AddPostForm;
