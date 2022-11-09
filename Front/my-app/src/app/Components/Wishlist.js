import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetWishlistAsync} from '../Slicers/getWishlistSlice'
import { selectproductswishlist } from '../Slicers/getWishlistSlice'
import { selectToken } from '../Slicers/loginSlice'
import BasicMenu from './DashboardSizes'
import { GetProdByIdAsync, selectprod } from '../Slicers/GetProdByIdSlice'


const Wishlist = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const [MyWishlist, setMyWishlist] = useState([])
  const Singleprod = useSelector(selectprod)
  // const allProducts = useSelector(selectproducts);
  // useEffect(() => {
  //     setmy(...my, dispatch(GetWishlistAsync({"Token":token})))
  // }, [my.length])

const Wishlistproducts = useSelector(selectproductswishlist)
useEffect(() => {
  // products.forEach(element => {
  //   MyWishlist.push(dispatch(GetProdByIdAsync(element.prod_id)))
   
  },[]);
  

  const count = 0   
  return (
    <div>
      <button  onClick={() => {dispatch(GetWishlistAsync({"Token":token}))} }>get wishlist</button>
      {/* <button onClick={setdata()}>press</button> */}
      
      {Wishlistproducts.map((prod,index) => {
        return (
        <div key={index}>
          {console.log(prod)}
          
          {()=> dispatch(GetProdByIdAsync(prod.prod_id))}
          {Singleprod[0].desc}
        </div>
        
        )
        
      })}

      {MyWishlist.map((pr,index)=>(
        <div>
            {JSON.stringify(pr[index])}
        </div>
      ))}
     


      <div class="header">

        <div class="inner-header flex">
          <svg version="1.1" class="logo" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" xmlSpace="preserve">
            <path fill="#FFFFFF" stroke="#000000" stroke-width="10" stroke-miterlimit="10" d="M57,283" />
          </svg>
        </div>

        {/* <div>
          <svg class="waves" xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>  */}
      </div>

    </div>
  )
}

export default Wishlist