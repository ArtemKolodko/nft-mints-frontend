import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NftDetail from "../../components/nft-detail/nft-detail.component";
import { getTokenDetail } from "../../utils/mint-interface/mint-inteface.utils";
import { ApiTokenResponseType } from "../../types";
import Logo from "../../assets/imgs/dj3n_logo.svg";

import "./claim-nft.styles.scss";

const ClaimNft = () => {
  const [tokenInfo, setTokenInfo] = useState<ApiTokenResponseType>(
    {} as ApiTokenResponseType
  );
  const { tokenUuid } = useParams();

  useEffect(() => {
    const getTokenInfo = async () => {
      const token = await getTokenDetail(tokenUuid!);
      if (token) {
        setTokenInfo(token);
      }
    };

    tokenUuid && getTokenInfo();
  }, [tokenUuid]);

  return (
    <div className="claim-container">
      <div className="claim-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      {Object.entries(tokenInfo).length !== 0 && (
        <NftDetail collection={tokenInfo.collection} token={tokenInfo.token} />
      )}
    </div>
  );
};

export default ClaimNft;
