import "./access-pass.styles.scss";
import { AccessPassProps } from "./access-pass-front.component";
import QR from "../../assets/imgs/qr-sample.png";

// type AccessPassAdditionalProperties = {
//   venue: string;
//   city: string;
//   state: string;
//   age: string;
//   date: string;
//   time: string;
// };

const AccessPassBack = (props: AccessPassProps) => {
  // const { primaryBackgroundColor, rate, logo } = props;
  const {
    rate,
    primaryBackgroundColor,
    secondaryBackgroundColor,
    additionalDetails,
    creatorRoyalty,
    refBack,
    creator,
  } = props;

  return (
    <div ref={refBack}>
      <div className="form__pass">
        <div className="form__pass--top"></div>
        <div
          className="form__pass--container"
          style={{ backgroundColor: primaryBackgroundColor }}
        >
          <div className="form__pass--price">${rate}</div>
          <div className="form__pass--info">
            <div className="full">
              <div className="description">
                Creator: {creator ? creator : "@creatorname"}
              </div>
              <div className="description">
                Transfer Royalty: {creatorRoyalty}% Harmony HRC-721
              </div>
              <div className="description">
                Additional Details: {additionalDetails}.
              </div>
            </div>
            <div
              className="img-container"
              style={{ backgroundColor: secondaryBackgroundColor }}
            >
              <img className="qr" src={QR} alt="Access Pass Logo" />
            </div>
          </div>
        </div>
        <div className="form__pass--bottom"></div>
      </div>
    </div>
  );
};

export default AccessPassBack;
