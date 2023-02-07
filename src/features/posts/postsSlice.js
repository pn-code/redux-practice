// HOW TO CREATE A SLICE
// Step 1: import createSlice from redux toolkit
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// Step 2: create initialState
const initialState = [
    {
        id: "1",
        title: "Learning Redux Toolkit",
        content: "State Management is important",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
    },
    {
        id: "2",
        title: "About Slices",
        content: "I can create a slice!",
        date: sub(new Date(), { minutes: 20 }).toISOString(),
    },
];

// Step 3: Create your slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            // Provide Reducer
            reducer(state, action) {
                // Payload references form data we will use later.
                state.push(action.payload);
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
                    },
                };
            },
        },
    },
});

// Selects all posts in the slice
export const selectAllPosts = (state) => state.posts;

// Export reducer actions
export const { postAdded } = postsSlice.actions;

// Step 4: export slice.reducer as default
export default postsSlice.reducer;
