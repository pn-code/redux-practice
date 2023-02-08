import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div>
      <h2>Add a New Post</h2>
      <form>
        <select
          onChange={(e) => setUserId(e.target.value)}
          name="user"
          id="user"
        >
          <option value="">CHOOSE YOUR USER</option>
          {userOptions}
        </select>
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
          <button disabled={!canSave} onClick={handleSubmit} type="button">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
