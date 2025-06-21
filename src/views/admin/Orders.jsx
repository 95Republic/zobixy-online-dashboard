import React, { useEffect, useState } from 'react';
import { PiArrowSquareDown } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders } from '../../store/Reducers/orderReducer';

const Orders = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show,setShow] = useState(false)

    const {myOrders,totalOrder} = useSelector(state => state.order)

    useEffect(() => {
            const obj = {
                parPage: parseInt(parPage),
                page: parseInt(currentPage),
                searchValue
            }
            dispatch(get_admin_orders(obj))
        },[searchValue,currentPage,parPage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
               {/* load data table ---------------- */}
               <Search setParPage={setParPage} setSearchValue={setSearchValue} 
                searchValue={searchValue}/>
               {/* END load data table ------------ */}


        <div className='relative mt-5 overflow-x-auto'>
            <div className='w-full text-sm text-left [#d0d2d6]'>
                <div className='text-sm text-[#d0d2d6] uppercase border-b 
                border-slate-700'>

                    <div className='flex justify-between items-center'>
                        <div className='py-3 w-[20%] font-bold'> Order id </div>
                        <div className='py-3 w-[13%] font-bold'> Price </div>
                        <div className='py-3 w-[18%] font-bold'> Payment Status </div>
                        <div className='py-3 w-[18%] font-bold'> Order Status </div>
                        <div className='py-3 w-[18%] font-bold'> Action </div>
                        <div className='py-3 w-[8%] font-bold'> <PiArrowSquareDown/> 
                        </div>
                    </div>
                </div>


            {
                myOrders.map((o,i) => <div className='text-[#d0d2d6]'>

                {/* Parent order */}
                <div className='flex justify-between items-start border-b border-slate-700'>
                    <div className='py-3 w-[20%] font-medium whitespace-nowrap'> #{o._id}</div>
                    <div className='py-3 w-[13%] font-medium'> R{o.price} </div>
                    <div className='py-3 w-[18%] font-medium'> {o.payement_status} </div>
                    <div className='py-3 w-[18%] font-medium'> {o.delivery_status} </div>
                    <div className='py-3 w-[18%] font-medium'>
                        <Link to={`/admin/dashboard/order/details/${o._id}`}>View</Link> 
                        </div>
                    <div onClick={(e) => setShow(o._id)} className='py-3 w-[8%] font-medium'> <PiArrowSquareDown/> 
                    </div>
                </div>



                


                {/* Child order aka sub order */}
                <div className={show === o._id ? 'block border-b border-slate-700 bg-[#8288ed]' : 'hidden'}>

                {
                    o.suborder.map((so, i) => <div className='flex justify-start items-start border-b border-slate-700'>
                    <div className='py-3 w-[20%] font-medium whitespace-nowrap pl-3'> #{so._id}</div>
                    <div className='py-3 w-[13%] font-medium'> R{so.price} </div>
                    <div className='py-3 w-[18%] font-medium'> {so.payement_status} </div>
                    <div className='py-3 w-[18%] font-medium'> {so.delivery_status} </div>
                </div>)
                }
                

                </div>
            </div>)
            }


            </div>

        </div>

        {/* Pagination section------------------- */}
        {
            totalOrder <= parPage ? "":<div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination 
                pageNumber = {currentPage}
                setPageNumber = {setCurrentPage}
                totalItems = {totalOrder}
                parPage = {parPage}
                showItem = {4}
            />
            </div>
        }
        
        {/* PAGINATION SECTION END--------------- */}

            </div>
            
        </div>
    );
};

export default Orders;