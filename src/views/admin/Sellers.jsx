import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_active_sellers } from '../../store/Reducers/sellerReducer';

const Sellers = () => {

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show,setShow] = useState(false)
    const {sellers,totalSeller} = useSelector(state => state.seller)


    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_active_sellers(obj))
    },[searchValue,currentPage,parPage])


    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-xl font-bold mb-3 text-[#5c5a5a]'>Sellers</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>

            {/* load data table ---------------- */}
            <Search setParPage={setParPage} setSearchValue={setSearchValue} 
            searchValue={searchValue}/>
            {/* END load data table ------------ */}

            {/* Table section------------------------- */}

            <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left text-[#d0d2d6]'>
                    <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                    <tr>
                        <th scope='col' className='py-3 px-4'>No</th>
                        <th scope='col' className='py-3 px-4'>Image</th>
                        <th scope='col' className='py-3 px-4'>Name</th>
                        <th scope='col' className='py-3 px-4'>Shop Name</th>
                        <th scope='col' className='py-3 px-4'>Payment Status</th>
                        <th scope='col' className='py-3 px-4'>Email</th>
                        <th scope='col' className='py-3 px-4'>Status</th>
                        <th scope='col' className='py-3 px-4'>District</th>
                        <th scope='col' className='py-3 px-4'>Action</th>
                    
                    </tr>
                    </thead>

                    <tbody>
        
                        {/* looping through the table rows */}
                        
                        {
                            sellers.map((d, i) => <tr key={i}>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i+1}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                <img className='w-[45px] h-[45px]' src={d.image} alt="" />
                            </td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.name}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.shopInfo?.shopName}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.payment}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.email}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.status}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d.shopInfo?.district}</td>
                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>

                                <div className='flex justify-start items-center gap-4'>
                                <Link to={`/admin/dashboard/seller/details/${d._id}`} className='p-[6px] bg-green-500 rounded 
                                hover:shadow-lg hover:shadow-green-500/50'> <FaEye/> 
                                </Link>

                                </div>

                                </td>
                        </tr>)
                        }

                    </tbody>

                </table>

                </div>

        {/* Pagination section------------------- */}
        {
            totalSeller <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination 
                pageNumber = {currentPage}
                setPageNumber = {setCurrentPage}
                totalItems = {totalSeller}
                parPage = {parPage}
                showItem = {4}
            />
            </div> 
        }
        
        {/* PAGINATION SECTION END--------------- */}


    {/* TABLE SECTION END--------------------- */}







        </div>  
    </div>
    );
};

export default Sellers;