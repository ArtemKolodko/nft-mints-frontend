import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import { getStripeAuthLink } from "../../utils/mint-interface/mint-inteface.utils";

import "./create-result.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export type CreateResultProps = {
  uuid: string;
};

const CreateResult = ({ uuid }: CreateResultProps) => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser)

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
      {!user?.stripeConnected &&  <><div className="create-result__subtitle create-result__alert">
        <h2>Important</h2>
      </div>
      
      <h3>In order to sell your collectible or access pass, you must first</h3>

      <Button label="Setup Stripe" className={"info"} onClick={connectStripe} />

      <div className="create-result__subtitle">
        <h3>Skip to</h3>
      </div>
      </>}
      {user?.stripeConnected && <h3>You've already connected your Stripe account</h3>}
      <Button
        label="View Gallery"
        className={"info"}
        onClick={() => navigate(`/nfts/gallery/${uuid}`)}
      />
    </div>
  );
};

export default CreateResult;
