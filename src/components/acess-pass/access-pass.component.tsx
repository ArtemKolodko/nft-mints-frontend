import "./access-pass.styles.scss";

export type AccessPassProps = {
  price: number;
  backgroundColor: string;
  logo: string;
};

const AccessPass = (props: AccessPassProps) => {
  const { backgroundColor, price, logo } = props;
  return (
    <div className="ticket" style={{ backgroundColor: backgroundColor }}>
      <div className="ticket__content">
        <p className="ticket__text">ACCESS <br />PASS <br />SCSS</p>
        <p className="ticket__price">
          Price: <br />
          {price}
        </p>
        {logo && (
          <div className="ticket__logo">
            <img src={logo} alt="test" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessPass;
