import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        job: null
    },
    reducers: {
        setJobs:(state, action) => {
            state.jobs = action.payload
        },
        setJob:(state, action) => {
            state.job = action.payload
        }
    }
})

export const { setJobs,setJob } = jobSlice.actions;

export default jobSlice.reducer;