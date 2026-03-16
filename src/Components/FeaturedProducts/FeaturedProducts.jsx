import React, { useEffect, useState } from 'react';
import style from './FeaturedProducts.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedProducts() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // async function getProducts() {
  //     let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //     setProducts(data.data);
  //     setLoading(false);
  //   }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  let {data , isLoading , isError , isFetching} = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: getProducts
  });
  console.log(data?.data.data);
  
  return <>
      <h2>Featured Products</h2>
      {isLoading ?
        <div className="">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            wrapperStyle={{}}
            wrapperClass="text-main d-flex justify-content-center mt-5"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
       : 
       <div className="row gy-4">
          {data?.data.data.map((product) => (
            <div key={product.id} className="col-lg-2">
              <Link to={`/productdetails/${product.id}`}>
                <div className="product p-2">
                  <img src={product.imageCover} className="w-100" alt={product.title} />
                  <span className='font-sm text-main'>{product.category.name}</span>
                  <h3 className="h5">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className="d-flex pt-3 justify-content-between align-content-center">
                    <span className='font-sm'>{product.price} EGP</span>
                    <span className='font-sm'>
                      <i className='fas fa-star rating-color me-1'></i>
                      {product.ratingsAverage}</span>
                  </div>
                  <button className='btn bg-main text-main-light w-100 btn-sm'>Add to Cart</button>
                </div>
              </Link>  
            </div>
          ))}
        </div>}
    </>
}