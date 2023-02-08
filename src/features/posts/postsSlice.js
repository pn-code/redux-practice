// HOW TO CREATE A SLICE
// Step 1: import createSlice from redux toolkit
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Step 2: Describe initial state
const initialState = {
  posts: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Async API Fetch
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return [...response.data];
});

// Async addNewPost
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

// Step 3: Create your slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      // Provide Reducer
      reducer(state, action) {
        // Payload references form data we will use later.
        state.posts.push(action.payload);
      },
      // Provide prepare cb
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              like: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  // Additional case reducers that run in response to actions outside of the slice
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            like: 0,
            wow: 0,
            heart: 0,
          };
          return post;
        });
        // Add any fetch posts to the array...
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          wow: 0,
          heart: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

// Selects all posts in the slice
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

// Export reducer actions
export const { postAdded, reactionAdded } = postsSlice.actions;

// Step 4: export slice.reducer as default
export default postsSlice.reducer;
