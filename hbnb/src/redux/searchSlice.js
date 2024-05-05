import  {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : "search",
    initialState:{
        search:null,
    },
    reducers:{
        setsearch:(state,action) => {
            state.search=action.payload;
        } 
    }
});
export const {setsearch} = searchSlice.actions;
export default searchSlice.reducer;