import Logo from '../../assets/imgs/dj3n_logo.svg'

const CheckoutFailure = () => {
  return (
    <div className='landing-container'>
      <img src={Logo} alt='dj3n logo' className='landing-logo'/>
      <h1>Transaction canceled</h1>
      <h2>Something went wrong</h2>
      <p>Please try again later</p>
    </div>
  )
}

export default CheckoutFailure;