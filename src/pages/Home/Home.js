import React, { useEffect } from "react";
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data';
import { useUserDetails } from '../../userContext';
import { useCartItems } from '../../cartContext';
import { db } from '../../firebaseInit';
import {doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot} from 'firebase/firestore';


const Home = () => {

      const {cartItems, setCartItems, removeProductFromCart} = useCartItems();
   const { userDetails, setUserDetails } = useUserDetails();
   const { uId } = userDetails;
  //  console.log('userlogged in ');
   

   useEffect(() => {
     const docRef = doc(db, "users", userDetails.uId);
     onSnapshot(docRef, (doc) => {
       let cart = doc.data().cartItems;
      //  console.log(cart);

       setCartItems(cart);
     });
   }, []);

   const addProductToCart = async (pId) => {
    
    const prdtIdx = products.findIndex(p=>p.id === pId);
    const prdt = products.find(p=>p.id === pId);
    products[prdtIdx] = {...prdt, inCart:true};    

    //now adding this product to user account in cloud firestore
    let docRef = doc(db, 'users', uId);
    // const userDoc = await getDoc(docRef)
    await updateDoc(docRef, {cartItems: arrayUnion(products[prdtIdx])});
   }

  


  return (
    <div className=" home_container">
      <div className=" container cards_container">
        {products.map((p, idx) => {
          return (
            <ProductCard
              key={idx}
              details={p}
              addProductToCart={addProductToCart}
              removeProductFromCart={removeProductFromCart}
            />
          );
        })}
      
      </div>
    </div>
  );
}

export default Home