import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NftCard from "../../components/nft-card/nft-card.component";
import { ApiOwnerTokenResponseType } from "../../types";
import { getTokensByOwner } from "../../utils/mint-interface/mint-inteface.utils";

import "./gallery.styles.scss";


const Gallery = () => {
  const [ tokens, setTokens ] = useState<Array<ApiOwnerTokenResponseType> | null>([]);

  const { ownerUuid } = useParams();

  useEffect(() => {
    const getTokens = async () => {
      const data = await getTokensByOwner(ownerUuid!);
      if (data) {
        console.log(data)
        setTokens(data)
      }
    }
    getTokens();
  }, [ownerUuid]);
  
  return (
    <div className="gallery-container">
      <h1>My Tokens</h1>
      {/* <div className="gallery-menu"></div> */}
      {tokens && (
      <div className="gallery">
        { tokens.map((token) => (
          <NftCard key={token.token.sequence} {...token} />
        ))}
    </div>
      )}

    </div>
  );
};

export default Gallery;
