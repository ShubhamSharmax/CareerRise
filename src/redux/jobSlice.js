import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        job: null,
        adminJobs: [],
        creatingJob: false,
        appliedJobs: [],
        searchQuery: null,
        filterJobs:[],
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
        setAppliedJobs:(state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchQuery:(state, action) => {
            state.searchQuery = action.payload
        },
        setFilterJobs:(state, action) => {
            state.filterJobs = action.payload
        }
    }
})

export const { setJobs, setJob, setAdminJobs, setCreatingJob, setAppliedJobs, setSearchQuery, setFilterJobs } = jobSlice.actions;

export default jobSlice.reducer;