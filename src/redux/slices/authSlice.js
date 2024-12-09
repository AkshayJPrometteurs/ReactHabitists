import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../components/Axios";

export const signup = createAsyncThunk('auth/signup',
    async (data, { rejectWithValue }) => {
        try{ const response = await Axios.post('register', data); return response.data;
        }catch(error){ return rejectWithValue(error.response.data); }
    }
);

export const fetchUser = createAsyncThunk('auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try { const response = await Axios.get('user'); return response.data;
        } catch (error) { return rejectWithValue(error.response.data); }
    }
);

export const signin = createAsyncThunk('auth/signin',
    async (data, { rejectWithValue }) => {
        try{ const response = await Axios.post('login', data); return response.data;
        }catch(error){ return rejectWithValue(error.response.data); }
    }
)

const initialState = { user : null, token : localStorage.getItem('ACCESS_TOKEN') || null, error : null, loading : false, toastMessage: null, }

const authSlice = createSlice({ name : 'auth', initialState, reducers: {},
    extraReducers : (builder) => {
        // signup
        builder.addCase(signup.pending, (state) => { state.loading = true; state.error = false; });
        builder.addCase(signup.fulfilled, (state,action) => {
            state.loading = false;
            state.token = action.payload.data.token;
            localStorage.setItem('ACCESS_TOKEN', action.payload.data.token)
            state.user = action.payload.data.user;
            localStorage.removeItem('splashQues');
            state.toastMessage = {type: 'success', message: 'Sign-Up Successfully!'};
        });
        builder.addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload.errors; });

        // Fetch User
        builder.addCase(fetchUser.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(fetchUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.data.user; });
        builder.addCase(fetchUser.rejected, (state, action) => { state.loading = false; state.error = action.payload.errors });

        // signin
        builder.addCase(signin.pending, (state) => { state.loading = true; state.error = false; });
        builder.addCase(signin.fulfilled, (state,action) => {
            state.loading = false;
            if (action.payload && action.payload.data.token) {
                const { token, user } = action.payload.data;
                state.token = token;
                localStorage.setItem('ACCESS_TOKEN', token);
                state.user = user;
                localStorage.removeItem('splashQues');
                state.toastMessage = {type: 'success', message: 'Sign-In Successfully!'};
            } else { state.error = action.payload.message }
        });
        builder.addCase(signin.rejected, (state, action) => { state.loading = false; state.error = action.payload.errors; });
    }
})

export default authSlice.reducer;