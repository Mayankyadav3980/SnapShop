import React from 'react'
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data';
import { useUserDetails } from '../../userContext';
import { db } from '../../firebaseInit';
import {doc, setDoc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';

const Home = () => {
   const { userDetails, setUserDetails } = useUserDetails();

   const addProductToCart = async (pId) => {
    const {uId} = userDetails;
    const prdt = products.find(p=>p.id === pId);
    // console.log('product is ', prdt, uId);
    

    //now adding this product to user account in cloud firestore
    const docRef = doc(db, 'users', uId);
    // const userDoc = await getDoc(docRef)
    await updateDoc(docRef, {cartItems: arrayUnion(prdt)});
    
   }
  return (
    <div className=" home_container">
      <div className=" container cards_container">
        {products.map((p, idx) => {
          return <ProductCard key={idx} details={p} addProductToCart={addProductToCart}/>;
        })}
      
      </div>
    </div>
  );
}

export default Home