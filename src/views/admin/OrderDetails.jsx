import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admin_order_status_update, get_admin_order, messageClear } from '../../store/Reducers/orderReducer';
import toast from 'react-hot-toast';

const OrderProductItem = ({ product }) => (
  <div className='flex gap-3 text-sm mb-3'>
    <img className='w-[50px] h-[50px] object-cover' src={product.images[0]} alt={product.name} />
    <div>
      <h2 className='font-medium'>{product.name}</h2>
      <p className='text-[#d0d2d6]'>
        <span>Brand: {product.brand}</span>
        <span className='ml-2'>Quantity: {product.quantity}</span>
      </p>
    </div>
  </div>
);

const SubOrderSection = ({ suborder }) => (
  <div className='text-[#d0d2d6] mt-4'>
    {suborder?.map((o, i) => (
      <div key={`suborder-${i}`} className='mb-6'>
        <div className='flex items-center gap-3 mb-2'>
          <h2 className='font-semibold'>Seller {i + 1} Order:</h2>
          <span className='px-2 py-1 bg-[#475569] rounded text-sm'>
            {o.delivery_status}
          </span>
        </div>
        {o.products?.map((p, idx) => (
          <OrderProductItem key={`suborder-product-${idx}`} product={p} />
        ))}
      </div>
    ))}
  </div>
);

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order, successMessage, errorMessage, loading } = useSelector(state => state.order);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (order?.delivery_status) {
      setStatus(order.delivery_status);
    }
  }, [order]);

  const handleStatusUpdate = (e) => {
    const newStatus = e.target.value;
    if (newStatus && newStatus !== status) {
      dispatch(admin_order_status_update({
        orderId,
        info: { status: newStatus }
      }));
      setStatus(newStatus);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  if (loading) {
    return <div className='px-2 lg:px-7 pt-5'>Loading order details...</div>;
  }

  if (!order) {
    return <div className='px-2 lg:px-7 pt-5'>Order not found</div>;
  }

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl text-[#d0d2d6]'>Order details</h2>
          <div className='relative'>
            <label htmlFor='order-status' className='sr-only'>Order Status</label>
            <select
              id='order-status'
              onChange={handleStatusUpdate}
              value={status}
              className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]'
            >
              <option value="">--select--</option>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="warehouse">warehouse</option>
              <option value="placed">placed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
        </div>

        <div className='p-4'>
          <div className='flex flex-wrap gap-4 mb-6'>
            <div className='w-full md:w-[48%] lg:w-[30%]'>
              <div className='bg-[#8288ed] p-4 rounded-md'>
                <h2 className='text-lg font-semibold text-[#d0d2d6] mb-3'>Order Information</h2>
                <p className='text-[#d0d2d6] mb-2'>Order #: {order._id}</p>
                <p className='text-[#d0d2d6] mb-4'>Date: {order.date}</p>

                <div className='mb-4'>
                  <h3 className='font-semibold text-[#d0d2d6] mb-1'>Deliver To:</h3>
                  <p className='text-[#d0d2d6]'>{order.shippingInfo?.name}</p>
                  <p className='text-sm text-[#d0d2d6]'>
                    {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.province}, {order.shippingInfo?.area}
                  </p>
                </div>

                <div className='mb-4'>
                  <h3 className='font-semibold text-[#d0d2d6]'>Payment Status:</h3>
                  <p className='text-[#d0d2d6]'>{order.payment_status}</p>
                </div>

                <div>
                  <h3 className='font-semibold text-[#d0d2d6]'>Total Price:</h3>
                  <p className='text-xl text-[#d0d2d6]'>R{order.price}</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-[48%] lg:w-[68%]'>
              <div className='bg-[#8288ed] p-4 rounded-md'>
                <h2 className='text-lg font-semibold text-[#d0d2d6] mb-3'>Products</h2>
                {order.products?.map((product, i) => (
                  <OrderProductItem key={`product-${i}`} product={product} />
                ))}
              </div>

              {order.suborder && order.suborder.length > 0 && (
                <div className='bg-[#8288ed] p-4 rounded-md mt-4'>
                  <h2 className='text-lg font-semibold text-[#d0d2d6] mb-3'>Seller Suborders</h2>
                  <SubOrderSection suborder={order.suborder} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;