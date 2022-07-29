import { checkHref } from '../../utils/utils';
import { TokenType, CollectionType } from '../../types';
import QR from "../../assets/imgs/qrSample.svg";
import './nft-detail.styles.scss';

type NftDetailProps = {
  token? : TokenType;
  collection : CollectionType;
}

const NftDetail = (props: NftDetailProps) => {
  const { token, collection } = props;
  const { title, description, collectionImage, link } = collection;

  const hrefLink = checkHref(link);

  return (
    <div className='nft-detail-container'>
      <div className='nft-detail-image' style={{ 
        backgroundImage: `url(${collectionImage})` }}>
        <div className="nft-detail-title">
          <h4>{title}</h4>
        </div>
      </div>
      <div className='nft-detail-info'>
        <h5>{description}</h5>
        { (token && collection.link) && (
          <div className='unlockable-content'>
            <h4>Unlockable Content attached to</h4>
            <a href={hrefLink} target='_blank' rel="noreferrer"><img src={QR} alt="QR Sample" /></a>
          </div>          
        )}
      </div>
      
    </div>
  );
}

export default NftDetail;