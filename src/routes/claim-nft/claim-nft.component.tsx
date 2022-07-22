import NftDetail from "../../components/nft-detail/nft-detail.component";
import { CollectionType } from "../../types";

const ClaimNft = () => {
  const nft : CollectionType = {
    title: "",
    description: "",
    link: "",
    collectionAddress: "",
    rate: 10,
    maxMint: 100,
    uuid: "",
    priceId: "",
    userUuid: undefined,
    productId: "",
    collectionImage: ""
  }
  
  return (
    <div className='claim-container'>
      <NftDetail  {...nft}/>
    </div>
  )
}

export default ClaimNft;
