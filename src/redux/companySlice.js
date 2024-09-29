import { createSlice } from "@reduxjs/toolkit";


const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        companyUpdating: false,
        company: null
    },
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload
        },
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setCompanyUpdating: (state, action) => {
            state.companyUpdating = action.payload
        }
    }
})

export const { setCompanies, setCompany, setCompanyUpdating } = companySlice.actions;

export default companySlice.reducer;