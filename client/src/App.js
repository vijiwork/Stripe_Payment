import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import SripeCheckOut from "react-stripe-checkout";

function App() {

  const [product, setProduct] = useState({
    name:"card",
    price:10,
    productBy:"me"
  });

  const makePayment=token=>{
    const body={
      token,
      product
    }
    const headers={
      "Content-Type":"application/json"
    }
    
    return fetch('http://localhost:3000/api/v1/stripe_api/payment',{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(res=>{
      console.log(res,"response");
      const {status}=res;
      console.log("status",status)
    })
    .catch(error=>{
      console.log(error);
    })
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <SripeCheckOut stripeKey={process.env.REACT_APP_KEY} 
        token={makePayment} 
        name="Buy"
        amount={product.price * 100}>
        <button>buy card by {product.price} rs</button>

        </SripeCheckOut>
      </header>
    </div>
  );
}

export default App;
