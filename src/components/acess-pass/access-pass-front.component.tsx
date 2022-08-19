import "./access-pass.styles.scss";
import Logo from "../../assets/imgs/dj3n_logo.svg";

// type AccessPassAdditionalProperties = {
//   venue: string;
//   city: string;
//   state: string;
//   age: string;
//   date: string;
//   time: string;
// };

export type AccessPassProps = {
  creator?: string;
  rate: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  textColor: string;
  logo: string;
  title?: string;
  perks?: string;
  description?: string;
  additionalDetails?: string;
  link?: string;
  creatorRoyalty?: string;
  refFront: any;
  refBack: any;
  venue: string;
  city: string;
  state: string;
  age: string;
  date: Date;
  isDetailPage? : boolean;
};

const AccessPassFront = (props: AccessPassProps) => {
  // const { primaryBackgroundColor, rate, logo } = props;
  const {
    rate,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    textColor,
    logo,
    title,
    perks,
    description,
    additionalDetails,
    creatorRoyalty,
    refFront,
    refBack,
    age,
    date,
    venue,
    city,
    state,
    creator,
  } = props;

  return (
    <div ref={refFront}>
      <div className="form__pass">
        <div className="form__pass--top"></div>
        <div
          className="form__pass--container"
          style={{ backgroundColor: primaryBackgroundColor, color: textColor }}
        >
          <div className="form__pass--price">${rate}</div>
          <div className="form__pass--info">
            <img
              className="logo"
              src={logo ? logo : Logo}
              alt="Access Pass Logo"
            />
            <h3
              className="title"
              style={{ backgroundColor: secondaryBackgroundColor }}
            >
              {title}
            </h3>
            <div className="details">
              <div className="col">{venue}</div>
              <div className="col">
                {city}, {state}
              </div>

              {date ? (
                <div className="col">{date.toLocaleDateString("en-US")}</div>
              ) : null}
              {age ? <div className="col">Age: {age}</div> : null}
              {date ? (
                <div className="col">{`${date.getHours()} : ${date.getMinutes()} `}</div>
              ) : null}
              {/* {date ? <div className="col"></div> : null}  */}
            </div>
            <div className="full">
              <div className="perk">{perks}</div>
              <div className="description" style={{ color: textColor }}>
                {description}
              </div>
            </div>
          </div>
        </div>
        <div className="form__pass--bottom"></div>
      </div>
    </div>
  );
};

export default AccessPassFront;
