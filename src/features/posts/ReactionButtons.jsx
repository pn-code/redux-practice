import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  like: "👍",
  wow: "😮",
  heart: "❤️",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        onClick={() =>
          dispatchEvent(reactionAdded({ postId: post.id, reaction: name }))
        }
        key={name}
        type="button"
      >
        {emoji}
        {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
