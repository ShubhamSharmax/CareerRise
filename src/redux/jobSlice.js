import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        job: null,
        adminJobs: [],
        creatingJob: false,
    },
    reducers: {
        setJobs:(state, action) => {
            state.jobs = action.payload
        },
        setJob:(state, action) => {
            state.job = action.payload
        },
        setAdminJobs:(state, action) => {
            state.adminJobs = action.payload
        },
        setCreatingJob:(state, action) => {
            state.creatingJob = action.payload
        },
    }
})

export const { setJobs, setJob, setAdminJobs, setCreatingJob } = jobSlice.actions;

export default jobSlice.reducer;