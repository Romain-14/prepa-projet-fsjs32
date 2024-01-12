import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//pour gérer une action asynchrone, on utilise createAsyncThunk
// createAsyncThunk prend en paramètre un nom d'action et une fonction qui retourne une promesse
const fetchCharacters = createAsyncThunk(
    "character/fetchCharacters",
    async () => {
        const response = await fetch("http://localhost:9000/api/v1/character/all");
        const data = await response.json();
        return data;
    }
);

const initialState = {
    list: [],
    isLoading: false,
    isError: false,
};

const characterSlice = createSlice({
    name:"character",
    initialState,
    // pour des actions asynchrones (avec createAsyncThunk)
    extraReducers: (builder) => {
        // builder est un objet qui contient des méthodes pour gérer les actions asynchrones
        // addCase prend en paramètre le nom de l'action et un callback qui prend en paramètre l'état et l'action
        // on gère ici les différentes étapes de la résolution de la promesse
        builder
          .addCase(fetchCharacters.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchCharacters.fulfilled, (state, action) => {
            console.log(action);
            state.list = action.payload;
            state.isLoading = false;
          })
          .addCase(fetchCharacters.rejected, (state, action) => {
            state.isError = action.error.message;
            state.isLoading = false;
          });
      },
});

// export de notre action asynchrone
export {fetchCharacters};

export default characterSlice.reducer;