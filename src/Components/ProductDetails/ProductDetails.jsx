import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import style from './ProductDetails.module.css';
import Slider from "react-slick";

export default function ProductDetails() {
  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  async function getProductDetails(productId) {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      setDetails(data.data);
      setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return<>
    {loading ?
        <div className="text-center mt-5">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            wrapperClass="text-main d-flex justify-content-center mt-5"
            ariaLabel="ball-triangle-loading"
            visible
          />
        </div> :

        <div className="row align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {details.images.map((image , index) => <img src={image} key={index} className='w-100' alt={details.title}/>)}
            </Slider>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h3 className="h5">{details.title}</h3>
              <p className="py-3">{details.description}</p>
              <span className="font-sm">{details.category?.name}</span>
              <div className="d-flex pt-3 justify-content-between align-content-center">
                <span className="font-sm">{details.price} EGP</span>
                <span className="font-sm">
                  <i className="fas fa-star rating-color me-1" />
                  {details.ratingsAverage}
                </span>
              </div>
              <button className="btn bg-main text-main-light w-100 btn-sm">Add to Cart</button>
            </div>
          </div>
        </div>
    }
  </>
}