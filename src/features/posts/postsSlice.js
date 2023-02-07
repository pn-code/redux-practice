// HOW TO CREATE A SLICE

// Step 1: import createSlice from redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Step 2: create initialState
const initialState = [
    {
        id: "1",
        title: "Learning Redux Toolkit",
        content: "State Management is important",
    },
    { id: "2", title: "About Slices", content: "I can create a slice!" },
];

// Step 3: Create your slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: (state, action) => {
            // Payload references form data we will use later.
            state.push(action.payload);
        },
    },
});

// Selects all posts in the slice
export const selectAllPosts = (state) => state.posts;

// Export reducer actions
export const { postAdded } = postsSlice.actions;

// Step 4: export slice.reducer as default
export default postsSlice.reducer;
