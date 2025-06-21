import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../store/Reducers/authReducer';
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { overrideStyle } from '../../utils/utils';


const AdminLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loader,errorMessage, successMessage} = useSelector(state => state.auth)

    // Defining state for inputs

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e)=> {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })

    }


    const submit = (e) =>{
        e.preventDefault()
        dispatch(admin_login(state))
        // console.log(state)

    }

    useEffect(()=> {
        if(errorMessage){
            //shows error messages on screen
            toast.error(errorMessage)
            dispatch(messageClear())

        }

        if (successMessage){
            //shows success messages on screen
            toast.success(successMessage)
            dispatch(messageClear())
            //once login success map to home page
            navigate('/')

        }
    },[errorMessage,successMessage])



    return (
        <div className='min-w-screen min-h-screen bg-[#cdcae9] flex 
        justify-center items-center'>
            <div className='w-[350px] text-[#fcf3f3] p-2'>

                <div className='bg-[#6f68d1] p-4 rounded-md'> 

            <div className='h-[70px] flex justify-center items-center'>
                <div className='w-[180px] h-[50px]'>
                    <img className='w-full h-full' src="http://localhost:3000/images/logo.png" alt="" />

                </div>
            </div>

                    {/* Adding form */}

                    <form onSubmit={submit}>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandler} value={state.email.toLowerCase()} className='px-3 py-2 outline-none border
                             border-slate-700 bg-transparent rounded-md'
                             type="email" name='email' placeholder='Email' id='email' required />

                        </div>


                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="password">Password</label>
                            <input onChange={inputHandler} value={state.password} className='px-3 py-2 outline-none border
                             border-slate-700 bg-transparent rounded-md'
                             type="password" name='password' placeholder='Password' id='name' required />

                        </div>

                        <button disabled={loader ? true : false} className='bg-slate-800 w-full hover:shadow-blue-300/
                        hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            {
                                loader ? <PropagateLoader color='#ffff' cssOverride={overrideStyle} /> : 'Login'
                            }
                            
                        </button>

                    </form>



                </div>

            </div>
            
        </div>
    );
};

export default AdminLogin;