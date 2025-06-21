import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async({parPage,page,searchValue},{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async(sellerId,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get(`/get-seller/${sellerId}`,{withCredentials: true})
            console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async(info,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.post(`/seller-status-update`,info,{withCredentials: true})
            console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const get_active_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async({parPage,page,searchValue},{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method


export const get_deactive_sellers = createAsyncThunk(
    'seller/get_deactive_sellers',
    async({parPage,page,searchValue},{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const create_paystack_account = createAsyncThunk(
    'seller/create_paystack_account',
    async() => {

        try{
            const {data: {url}} = await api.get(`/payment/create-paystack-account`,{withCredentials: true})
            window.location.href = url

        } catch (error) {
            // console.log(error.response.data)

        }
    }
)

//End method

export const activate_sellers_payment_accounts = createAsyncThunk(
    'seller/create_paystack_account',
    async(activeCode,{rejectWithValue, fulfillWithValue}) => {

        try{
            const {data} = await api.put(`/payment/activate-payment-account/${activeCode}`,{},{withCredentials: true})
            // console.log(data)
            return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

//End method



export const sellerReducer = createSlice({
    name: 'seller',
    initialState:{
        successMessage : '',
        errorMessage : '',
        loader: false,
        sellers : [],
        totalSeller: 0,
        seller: ''

    },
    reducers : {

        //function to clear error messages
        messageClear : (state,_) => {
            state.successMessage = ""
            state.errorMessage = ""
        }

    },

    extraReducers:(builder) => {
        // input validation
        builder
        .addCase(get_seller_request.fulfilled, (state,{payload}) => {
            state.sellers = payload.sellers;
            state.totalSeller = payload.totalSeller;
        })
        .addCase(get_seller.fulfilled, (state,{payload}) => {
            state.seller = payload.seller;
        })
        .addCase(seller_status_update.fulfilled, (state,{payload}) => {
            state.seller = payload.seller;
            state.successMessage = payload.message;
        })

        .addCase(get_active_sellers.fulfilled, (state,{payload}) => {
            state.sellers = payload.sellers;
            state.totalSeller = payload.totalSeller;
        })

        .addCase(get_deactive_sellers.fulfilled, (state,{payload}) => {
            state.sellers = payload.sellers;
            state.totalSeller = payload.totalSeller;
        })

        .addCase(activate_sellers_payment_accounts.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(activate_sellers_payment_accounts.rejected, (state,{payload}) => {
            state.loader = false;
            state.errorMessage = payload.message;
        })

        .addCase(activate_sellers_payment_accounts.fulfilled, (state,{payload}) => {
            state.loader = false;
            state.successMessage = payload.message;
        })

    

    }
})
export const {messageClear} = sellerReducer.actions
export default sellerReducer.reducer