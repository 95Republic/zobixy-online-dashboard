import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_dashboard_data = createAsyncThunk(
    'dashboard/get_admin_dashboard_data',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try{

            const {data} = await api.get('/admin/get-dashboard-data', {withCredentials: true})
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)
//END METHOD



export const get_seller_dashboard_data = createAsyncThunk(
    'dashboard/get_seller_dashboard_data',
    async(_,{rejectWithValue, fulfillWithValue}) => {
        try{

            const {data} = await api.get('/seller/get-dashboard-data', {withCredentials: true})
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)
//END METHOD


export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState:{
        totalSales : 0,
        totalOrders : 0,
        totalProducts: 0,
        totalPendingOrders : 0,
        totalSellers: 0,
        recentOrders: [],
        recentMessages: []

    },
    reducers : {

        //function to clear error messages
        messageClear : (state,_) => {
            state.errorMessage = ""
        }

    },

    extraReducers:(builder) => {
       
        builder
        .addCase(get_admin_dashboard_data.fulfilled, (state,{payload}) => {
            state.totalSales = payload.totalSales;
            state.totalOrders = payload.totalOrders;
            state.totalProducts = payload.totalProducts;
            state.totalSellers = payload.totalSellers;
            state.recentOrders = payload.recentOrders;
            state.recentMessages = payload.messages;
        })
          .addCase(get_seller_dashboard_data.fulfilled, (state,{payload}) => {
            state.totalSales = payload.totalSales;
            state.totalOrders = payload.totalOrders;
            state.totalProducts = payload.totalProducts;
            state.totalPendingOrders = payload.totalPendingOrders;
            state.recentOrders = payload.recentOrders;
            state.recentMessages = payload.messages;
        })


    

    }
})
export const {messageClear} = dashboardReducer.actions
export default dashboardReducer.reducer