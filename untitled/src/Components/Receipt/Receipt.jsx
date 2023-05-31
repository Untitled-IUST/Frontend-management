import React from 'react'
import "./Receipt.css"
// import { getRestaurant } from '../../Services/axios'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BrowserRouter , Routes , Route , Navigate , useNavigate} from "react-router-dom";

import { useLocation } from 'react-router-dom';

export const Receipt = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  const [rest,setRest] = useState({})
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
//   const [price,setPrice] = useState (searchParams.get("price"))
//   const [id, setId] = useState(searchParams.get("id"))
//   const [orderId , setOrderId] = useState(searchParams.get("OrderId"))
  const navigate = useNavigate()
  const queryString = new URLSearchParams(location.search);
  const money = queryString.get('value');


//   useEffect(() => {
//     getRestaurant(id).then (e => {
//       setRest({
//         name: e.data.name,
//         logoImg: e.data.logoImg,
//       })
//     }).catch()
//   },[]);

  function handleSubmit () {
    navigate('/AddService')
  }

  return (
    <div className='ReceiptMain'>
      <div className='ReceiptContainer'>
        <div className='ReceiptCard'>
          <div className='ReceiptTop'>
          <p className='ReceiptResponse'>
            Your order has succesfully received!
          </p>
          </div>

          <div className='ReceiptDetails'>
            <div className='ReceiptList'>
              <p>Date</p> 
              <p className='answer'>: {date}</p>
            </div>
            <div className='ReceiptList'>
              <p>Final price</p> 
              <p className='answer'>: {money}$</p>
            </div>
          </div>

          <div className='ReceiptBottom'>
            <p>Back to making money!</p>
            <button className='ReceiptButton' onClick={()=>handleSubmit()}>Management Panel</button>
          </div>
        </div> 
      </div>
    </div>
  )
}