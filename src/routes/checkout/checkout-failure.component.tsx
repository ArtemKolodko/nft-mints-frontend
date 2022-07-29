import { useParams } from "react-router-dom";


import "./checkout.styles.scss";

import Logo from "../../assets/imgs/DJ3N Logo.png"

const CheckoutFailure = () => {
  const { userUuid } = useParams();
  console.log('user',userUuid);
  return (
    <div className="checkout-response-container">
      <div className="checkout-response-logo">
        <img src={Logo} alt='dj3n logo'/>
      </div>
      <h1>Transaction canceled</h1>
      <h2>Something went wrong</h2>
      <p>Please try again later</p>
    </div>
  )
}

export default CheckoutFailure;
