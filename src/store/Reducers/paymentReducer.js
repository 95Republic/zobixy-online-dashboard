import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_seller_payment_details = createAsyncThunk(
    'payment/get_seller_payment_details',
    async(sellerId,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get(`/payment/seller-payment-details/${sellerId}`,{withCredentials: true})
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method


export const send_withdrawal_request = createAsyncThunk(
    'payment/send_withdrawal_request',
    async(info,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.post("/payment/withdrawal-request",info,{withCredentials: true})
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method


export const get_payment_request = createAsyncThunk(
    'payment/get_payment_request',
    async(_,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get("/payment/request",{withCredentials: true})
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const confirm_payment_request = createAsyncThunk(
    'payment/confirm_payment_request',
    async(paymentId,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.post(`/payment/request-confirm`,{paymentId},{withCredentials: true})
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method






export const paymentReducer = createSlice({
    name: 'payment',
    initialState:{
        successMessage : '',
        errorMessage : '',
        loader: false,
        pendingWithdrawals : [],
        successfulWithdrawals: [],
        totalAmount: 0,
        availableAmount: 0,
        withdrawalAmount: 0,
        pendingAmount: 0

    },
    reducers : {

        //function to clear error messages
        messageClear : (state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }

    },

    extraReducers:(builder) => {
        builder
        .addCase(get_seller_payment_details.fulfilled, (state,{payload}) => {
            state.totalAmount = payload.totalAmount;
            state.pendingAmount = payload.pendingAmount;
            state.withdrawalAmount = payload.withdrawalAmount;
            state.availableAmount = payload.availableAmount;
            state.pendingWithdrawals = payload.pendingWithdrawals;
            state.successfulWithdrawals = payload.successfulWithdrawals;
        })

         .addCase(send_withdrawal_request.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(send_withdrawal_request.rejected, (state,{payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        })

        .addCase(send_withdrawal_request.fulfilled, (state,{payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.pendingWithdrawals = [...state.pendingWithdrawals, payload.withdrawal];
            state.availableAmount = state.availableAmount - payload.withdrawal.amount;
            state.pendingAmount = payload.withdrawal.amount;
        })

         .addCase(get_payment_request.fulfilled, (state,{payload}) => {
            state.pendingWithdrawals = payload.withdrawalRequest;
        })

        .addCase(confirm_payment_request.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(confirm_payment_request.rejected, (state,{payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        })

        .addCase(confirm_payment_request.fulfilled, (state,{payload}) => {
            const temp = state.pendingWithdrawals.filter(r => r._id !== payload.payment._id)
            state.loader = false;
            state.successMessage = payload.message;
            state.pendingWithdrawals = temp
        })
        
    

    }
})
export const {messageClear} = paymentReducer.actions
export default paymentReducer.reducer