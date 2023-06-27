import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localstorage';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    // user: null;
};



export const registerUser = createAsyncThunk('/api​/User​/signin',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/register', user);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
        // console.log(`Register User: ${JSON.stringify(user)}`)
    }

);

export const loginUser = createAsyncThunk('user/loginUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/auth/login', user)
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
        // console.log(`Login User: ${JSON.stringify(user)}`)
    });

// user.user.token = name of slice.name of property.token 
export const updateUser = createAsyncThunk('user/updateUser',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.patch('auth/updateUser', user, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            return resp.data;
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue("Unauthorised! You have been logged out")
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state, { payload }) => {
            state.user = null;
            removeUserFromLocalStorage();
            if (payload) {
                toast.success(payload)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isLoading = false;
                // const { user } = payload;
                // state.user = user;
                addUserToLocalStorage(payload.user);
                toast.success(`Hello There ${payload.user.name}`)
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)

            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isLoading = false;
                // const { user } = payload;
                // state.user = user;
                addUserToLocalStorage(payload.user);
                toast.success(`Welcome Back ${payload.user.name}`)
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)

            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.isLoading = false;
                // const { user } = payload;
                // state.user = user;
                addUserToLocalStorage(payload.user);
                toast.success('Profile updated succesfully')
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)

            })
    }

});


export default userSlice.reducer;
export const { logoutUser } = userSlice.actions; 