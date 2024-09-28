import { createSlice } from "@reduxjs/toolkit";


const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        company: null
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        setCompany: (state, action) => {
            state.company = action.payload
        }
    }
})

export const { setCompanies, setCompany } = companySlice.actions;

export default companySlice.reducer;