import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import { getStripeAuthLink } from "../../utils/mint-interface/mint-inteface.utils";

import "./create-result.styles.scss";

export type CreateResultProps = {
  uuid: string;
};

const CreateResult = ({ uuid }: CreateResultProps) => {
  const navigate = useNavigate();

  const connectStripe = async (e: any) => {
    console.log(e);
    console.log("click");
    try {
      const stripeLink = await getStripeAuthLink();
      console.log("Stripe auth link:", stripeLink);
      window.open(stripeLink);
    } catch (e) {
      console.log("Cannot get Stripe link", e);
    }
  };

  return (
    <div className="create-result">
      <div className="create-result__subtitle create-result__alert">
        <h2>Important</h2>
      </div>
      <h3>In order to sell your collectible or access pass, you must first</h3>

      <Button label="Setup Stripe" className={"info"} onClick={connectStripe} />

      <div className="create-result__subtitle">
        <h3>Skip to</h3>
      </div>
      <Button
        label="View Gallery"
        className={"info"}
        onClick={() => navigate(`/nfts/gallery/${uuid}`)}
      />
    </div>
  );
};

export default CreateResult;
