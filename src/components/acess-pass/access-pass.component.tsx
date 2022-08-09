import './access-pass.styles.scss';

export type AccessPassProps = {
  price : number;
  backgroundColor : string;
  logo : string;
}

const AccessPass = (props : AccessPassProps) => {
  const { backgroundColor, price, logo } = props;
  return (
    <div className="ticket" style={{ backgroundColor: backgroundColor}}>
      <div className="ticket__content">
        <p className="ticket__text">Pure CSS Ticket</p>
        <p>{price}</p>
        {logo && <img src={logo} alt='test' style={{ width: '80px'}}/>}
      </div>
    </div>
  )
}

export default AccessPass;
