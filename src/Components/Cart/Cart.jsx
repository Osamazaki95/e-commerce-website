import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { BallTriangle } from 'react-loader-spinner';

export default function Cart() {
  let {getCartItems , deleteCartItems , updateCartItems} = useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getItems(){
    let {data} = await getCartItems();
    setCart(data);
    setLoading(false);
  }
  async function deleteItem(id){
    setLoading(true);
    let {data} = await deleteCartItems(id);
    setCart(data);
    setLoading(false);
  }
  async function updateItem(id , count){
    if (count < 1) {
      let {data} = await deleteCartItems(id);
      setCart(data);
    }else{
      let {data} = await updateCartItems(id , count);
      setCart(data);
    }
  }

  useEffect(() => {
    getItems();
  } , [])

  return <>
    <div className="bg-main-light p-2 mt-5">
      <h2>Shop Cart</h2>
      {loading? <div className='loading'>
      <BallTriangle
            height={100}
            width={100}
            radius={5}
            wrapperStyle={{}}
            wrapperClass="text-main d-flex justify-content-center mt-5"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
    </div> : <>
    <p className='text-main'> numOfCartItems : {cart.numOfCartItems}</p>
    <p className='text-main'> totalCartPrice : {cart.data.totalCartPrice} EGP</p>
    {cart.data.products.map((product) => (
    <div key={product.product.id} className="row align-items-center p-2 m-0 border-1 border-bottom">
      <div className="col-md-1">
        <div className="img">
          <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
        </div>
      </div>
      <div className="col-md-10">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>Price : {product.price} EGP</p>
          <button onClick={() => deleteItem(product.product.id)} className='btn'>
            <i className='fas fa-trash-can text-danger'></i>
            Remove
          </button>
        </div>
      </div>
      <div className="col-md-1">
        <div className="conut">
          <button onClick={() => updateItem(product.product.id , product.count +1)} className='btn brdr px-2 py-1'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={() => updateItem(product.product.id , product.count -1)} className='btn brdr px-2 py-1'>-</button>
        </div>
      </div>
    </div>
    ))}
    </>
    }
    </div>
  </>
}
