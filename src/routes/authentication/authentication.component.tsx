import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <div className='home-image'>qr image</div>
      <div className="phone-validation-container">
        <div>
          <input className='form-input'>
          </input>
        </div>
        <div>
          <button>Enter Phone #</button>
        </div>
      </div>
    </div>
  )  
}

export default Authentication;