import React, { useEffect } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useUserDetails } from '../../userContext';
import { db } from '../../firebaseInit';
import {getDoc, doc, onSnapshot} from 'firebase/firestore';
import { useCartItems } from '../../cartContext';

const Cart = () => {
    const prdt = {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      des: "Noise-canceling over-ear headphones with high-quality sound.",
      price: 79.99,
      category: "Electronics",
      stock: 25,
      rating: 4.5,
      img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1682587116/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/271047_0_yaama6.png?tr=w-600",
      tags: ["wireless", "bluetooth", "audio"],
    };
    const {cartItems, setCartItems} = useCartItems();
    const { userDetails, setUserDetails } = useUserDetails();
    useEffect(()=>{
        // const docRef = doc(db, 'users', userDetails.uId)
        // onSnapshot(docRef, (snapshot) => {
        //     const uData = snapshot.map(d=> {
        //         return {
        //             uId: d.id,
        //             ...d.data()
        //         }
        //     })
        // })
    },[])

     
  return (
    <div className='container cart_cont'>
        <ProductCard details={prdt}/>
    </div>
  )
}

export default Cart