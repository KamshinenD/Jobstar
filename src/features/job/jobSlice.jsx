import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
// import { getUserFromLocalStorage } from "../../utils/localstorage";
import { logoutUser } from "../user/userSlice";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";


const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internshipt'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const createJob = createAsyncThunk('job/createJob',
    async (job, thunkAPI) => {
        try {
            const resp = await customFetch.post('/jobs', job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                },
            });
            // console.log(resp)
            thunkAPI.dispatch(clearValues());
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser())
                return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const deleteJob = createAsyncThunk('job/deleteJob',
    async (jobId, thunkAPI) => {
        try {
            const resp = await customFetch.delete(`jobs/${jobId}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            thunkAPI.dispatch(getAllJobs());
            return thunkAPI.fulfillWithValue(resp.data.msg)
            // return resp.data;
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser())
                return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    })

export const editJob = createAsyncThunk('job/editJob',
    async ({ jobId, job }, thunkAPI) => {
        try {
            const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`
                },
            });
            thunkAPI.dispatch(clearValues());
            return thunkAPI.fulfillWithValue('Job Edited successfully')
            // return resp.data
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser())
                return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChange: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {
                ...initialState
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createJob.fulfilled, (state) => {
                state.isLoading = false;
                toast.success('Job created');

            })
            .addCase(createJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(deleteJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteJob.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                toast.success(payload);

            })
            .addCase(deleteJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })
            .addCase(editJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editJob.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                toast.success(payload);
            })
            .addCase(editJob.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload)
            })

    }

});



export default jobSlice.reducer;
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;