import React, { useContext, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Orders = () => {

    const {getTotalCartAmt,token,food_list,cartItems,url} = useContext(StoreContext)

    const [data , setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:"",
    })

    const onchangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setData(data =>({...data,[name]:value}))
    }

    const placeorder = async (event) => {
        event.preventDefault()
        let orderItems = []
        food_list.map((item)=>{
          if(cartItems[item._id]>0){
            let itemInfo = item
            itemInfo["quantity"] = cartItems[item._id]
            orderItems.push(itemInfo)
          }
        })
        let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalCartAmt()+2,

        }
        let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        if (response.data.success) {
          const {session_url} = response.data
          window.location.replace(session_url)
        }
        else{
          alert("Failed to place order")
        }
    }

  return (
    <form onSubmit={placeorder} className="orders">
        <div className="orders-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='FirstName' />
                <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='LastName'/>
            </div>
            <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='emailAddress'/>
            <input required name='street' onChange={onchangeHandler} value={data.street} type="text" placeholder='street'/>
            <div className="multi-fields">
                <input  required name='city' onChange={onchangeHandler} value={data.city} type="text" placeholder='City' />
                <input required name='state' onChange={onchangeHandler} value={data.state} type="text" placeholder='State'/>
            </div>
            <div className="multi-fields">
                <input required name='zipcode' onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip-code' />
                <input required name='country' onChange={onchangeHandler} value={data.country} type="text" placeholder='Country'/>
            </div>
            <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone :' />
        </div>

        <div className="orders-right">
        <div className="cart-total">
          <h2>cart Total</h2>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmt()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmt()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${ getTotalCartAmt()===0?0:getTotalCartAmt()+2}</b>
            </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
        </div>
    </form>
)
}

export default Orders