import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        // console.log(info)
        try{

            const {data} = await api.post('/admin-login',info,
                {withCredentials: true})
                //saving data on local storage
                localStorage.setItem('accessToken', data.token)
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        // console.log(info)
        try{

            const {data} = await api.post('/seller-login',info,
                {withCredentials: true})
                //saving data on local storage
                console.log(data)
                localStorage.setItem('accessToken', data.token)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {
        
        try{
            const {data} = await api.get('/get-user',{withCredentials: true})
    
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)



export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async(image ,{rejectWithValue, fulfillWithValue}) => {
        
        try{
            const {data} = await api.post('/profile-image-upload',image,{withCredentials: true})
    
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)
/// end method


export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        console.log('calling seller reg')
        try{
            console.log(info)
            const {data} = await api.post('/seller-register',info,
                {withCredentials: true})
                //saving data on local storage
                localStorage.setItem('accessToken', data.token)
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

/// end method 

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async(info,{rejectWithValue, fulfillWithValue}) => {
        console.log('calling seller profile info add')
        try{
            console.log(info)
            const {data} = await api.post('/profile-info-add',info,
                {withCredentials: true})
    
                // console.log(data)
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)
//end method

export const logout = createAsyncThunk(
    'auth/logout',
    async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
        try{

            const {data} = await api.get('/logout',
                {withCredentials: true})
                //saving data on local storage
                localStorage.removeItem('accessToken')
                if (role === 'admin') {
                    navigate('/admin/login')
                } else {
                    navigate('/login')
                }
                return fulfillWithValue(data)

        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)

        }
    }
)

    const returnRole = (token) => {
        if (token) {
            
            const decodeToken = jwtDecode(token)
            const expiryTimeStamp = new Date(decodeToken.exp *1000)
            
            if (new Date() > expiryTimeStamp) {
                localStorage.removeItem('accessToken') //deleting access token from local storage if expired 
                return ''
            } else {
                return decodeToken.role
                
            }
            
        } else {
            return ''
            
        }

    }

//Change password call
export const change_password = createAsyncThunk(
    'auth/change_password', 
    async(info,{rejectWithValue, fulfillWithValue}) => {
        try{
            const {data} = await api.post('/change-password',info,{withCredentials: true})
    
            return fulfillWithValue(data)

        } catch (error) {
            return rejectWithValue(error.response.data)

        }
    }
)
//end method



export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage : '',
        errorMessage : '',
        loader: false,
        userInfo : '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')

    },
    reducers : {

        //function to clear error messages
        messageClear : (state,_) => {
            state.errorMessage = ""
        }

    },

    extraReducers:(builder) => {
        //input validation
        builder
        .addCase(admin_login.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(admin_login.rejected, (state,{payload}) => {
            state.loader = false;
            //showcase error messages from our backend 
            state.errorMessage = payload.error
        })


        .addCase(admin_login.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })




        //Seller customer login
        .addCase(seller_login.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(seller_login.rejected, (state,{payload}) => {
            state.loader = false;
            //showcase error messages from our backend 
            state.errorMessage = payload.error
        })


        .addCase(seller_login.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })





        //seller customer register 
        .addCase(seller_register.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(seller_register.rejected, (state,{payload}) => {
            state.loader = false;
            //showcase error messages from our backend 
            state.errorMessage = payload.error
        })


        .addCase(seller_register.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(get_user_info.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.userInfo = payload.userInfo
        })


        .addCase(profile_image_upload.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(profile_image_upload.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })


        .addCase(profile_info_add.pending, (state,{payload}) => {
            state.loader = true;
        })

        .addCase(profile_info_add.fulfilled, (state,{payload}) => {
            state.loader = false;
            //showcase success messages from our backend 
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })


        //change password

        .addCase(change_password.pending, (state) => {
            state.loader = true;
            state.errorMessage = null;
        })

        .addCase(change_password.rejected, (state,{payload}) => {
            state.loader = false;
            state.errorMessage = payload.message
        })

        .addCase(change_password.fulfilled, (state,{payload}) => {
            state.loader = false;
            state.successMessage = payload.message
        })


    

    }
})
export const {messageClear} = authReducer.actions
export default authReducer.reducer