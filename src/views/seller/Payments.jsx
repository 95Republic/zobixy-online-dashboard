import React, { forwardRef, useEffect, useState } from 'react';
import { GrCurrency } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import { get_seller_payment_details, send_withdrawal_request } from '../../store/Reducers/paymentReducer';
import toast from 'react-hot-toast';
import { messageClear } from '../../store/Reducers/sellerReducer';
import moment from 'moment/moment';

function handleOnWheel({ deltaY }){
    console.log('handleOnWheel', deltaY)
}

const outterElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const Payments = () => {

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth)
    const {successMessage,errorMessage,loader,pendingWithdrawals,successfulWithdrawals,
        totalAmount,withdrawalAmount,pendingAmount,availableAmount} = useSelector(state => state.payment)

    const [amount,setAmount] = useState(0)

    const sendRequest = (e) => {
        e.preventDefault()
        if(availableAmount - amount > 50){
            dispatch(send_withdrawal_request({amount, sellerId: userInfo._id}))
            setAmount(0)
        }else{
            toast.error("You insufficient funds to process this withdrawal")
        }
    }

    const Row = ({ index,style }) => {
        return (
            <div style={style} className='flex text-sm text-white font-medium'>
                <div className='w-[18%] p-2 whitespace-nowrap'>{index +1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>R{pendingWithdrawals[index]?.amount}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 
                    text-blue-500 rounded-md text-sm'>{pendingWithdrawals[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{moment(pendingWithdrawals[index]?.createdAt).format('LL')}</div>

            </div>
        )
    }


    const Rows = ({ index,style }) => {
        return (
            <div style={style} className='flex text-sm text-white font-medium'>
                <div className='w-[18%] p-2 whitespace-nowrap'>{index +1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>R{successfulWithdrawals[index]?.amount}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] bg-slate-300 
                    text-blue-500 rounded-md text-sm'>{successfulWithdrawals[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{moment(successfulWithdrawals[index]?.createdAt).format('LL')}</div>

            </div>
        )
    }

    useEffect(() => {
        dispatch(get_seller_payment_details(userInfo._id))
    },[])

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }

          if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage,errorMessage])
    return (
        <div className='px-2 md:px-7 py-5'>
            {/* section for cards on admin dashboard-------------------------------- */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
            lg:grid-cols-4 gap-7 mb-5'>


        
                <div className='flex justify-between items-center p-5 bg-[#fae8e8] 
                rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start 
                    text-[#5c5a5a]'>
                        <h2 className='text-2xl font-bold'>R{totalAmount}</h2>
                        <span className='text-sm font-bold'>Total Sales</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] 
                    flex justify-center items-center text-xl'>
                        <GrCurrency className='text-[#fae8e8] 
                        shadow-lg'/>

                    </div>
                </div>



                <div className='flex justify-between items-center p-5 bg-[#fde2ff] 
                rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start 
                    text-[#5c5a5a]'>
                        <h2 className='text-2xl font-bold'>R{availableAmount}</h2>
                        <span className='text-sm font-bold'>Available amount</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#760077] 
                    flex justify-center items-center text-xl'>
                        <GrCurrency className='text-[#fae8e8] 
                        shadow-lg'/>

                    </div>
                </div>




                <div className='flex justify-between items-center p-5 bg-[#e9feea] 
                rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start 
                    text-[#5c5a5a]'>
                        <h2 className='text-2xl font-bold'>R{withdrawalAmount}</h2>
                        <span className='text-sm font-bold'>Withdrawn amount</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#038000] 
                    flex justify-center items-center text-xl'>
                        <GrCurrency className='text-[#fae8e8] 
                        shadow-lg'/>

                    </div>
                </div>





                <div className='flex justify-between items-center p-5 bg-[#ecebff] 
                rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start 
                    text-[#5c5a5a]'>
                        <h2 className='text-2xl font-bold'>R{pendingAmount}</h2>
                        <span className='text-sm font-bold'>Pending Withdrawal Amount</span>
                    </div>

                    <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] 
                    flex justify-center items-center text-xl'>
                        <GrCurrency className='text-[#fae8e8] 
                        shadow-lg'/>

                    </div>
                </div>
            </div>
            {/* END CARD SECTION------------------- */}




            {/* Column sections */}

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>
                {/* start send request section---------------------- */}

                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg'>Send Request</h2>
                    <div className='pt-5 mb-5'>
                        <form onSubmit={sendRequest}>
                            <div className='flex gap-3 flex-wrap'>
                <input onChange={(e) => setAmount(e.target.value)} value={amount} min='0' type="number" className='px-3 py-2 md:w-[60%] focus:border-indigo-200 
                outline-none bg-[#6a5fdf] border border-slate-700 
                rounded-md text-[#d0d2d6]' name='amount' />
                
                <button disabled={loader} className='bg-red-500  hover:shadow-red-500/40 
                hover:shadow-md text-white rounded-md px-7 py-2'>{loader ? 'loading...' : 'Submit'}</button>

                            </div>
                        </form>

                    </div>



                    <div>
                        <h2 className='text-lg pb-4'>Pending Request</h2>
                        
                        {/* Load react window------------------*/}
                        <div className='w-full overflow-x-auto'>
                            {/* table headings */}
                            <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[300px] rounded-md'>

                                <div className='w-[18%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>Status</div>
                                <div className='w-[25%] p-2'>Date</div>

                            </div>

                            {/* loading data */}

                            {
                                <List
                                style={ {mindWidth : '300px'}}
                                className='List'
                                height={350}
                                itemCount={pendingWithdrawals.length}
                                itemSize={35}
                                outerElementType={outterElementType}
                                >
                                    {Row}

                                </List>

                            }

                        </div>
                        {/* End load react window------------- */}
                    </div>

                </div>
                {/* END SEND REQUEST SECTION---------------------- */}




            



                {/* start success withdraw section---------------------- */}
                
                <div className='bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5'>
                    <h2 className='text-lg mb-5'>Successful Withdrawals</h2>

                    <div>
                        
                        {/* Load react window------------------*/}
                        <div className='w-full overflow-x-auto'>
                            {/* table headings */}
                            <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[300px] rounded-md'>

                                <div className='w-[18%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>Status</div>
                                <div className='w-[25%] p-2'>Date</div>

                            </div>

                            {/* loading data */}

                            {
                                <List
                                style={ {mindWidth : '300px'}}
                                className='List'
                                height={350}
                                itemCount={successfulWithdrawals.length}
                                itemSize={35}
                                outerElementType={outterElementType}
                                >
                                    {Rows}

                                </List>

                            }

                        </div>
                        {/* End load react window------------- */}
                    </div>

                </div>
                {/* END SUCCESS WITHDRAW SECTION---------------------- */}


            </div>

        </div>
    );
};

export default Payments;