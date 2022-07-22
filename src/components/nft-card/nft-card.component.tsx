import { CollectionType, TokenType } from '../../types';
import './nft-card.styles.scss';

type NftCardProps = {
  collection: CollectionType,
  token: TokenType
}

const NftCard = (props: NftCardProps) => {
  const { collection } = props;
  return (
    <div className='nft-card-container' 
      style={{ 
        backgroundImage: `url(${collection.collectionImage})` }}
    >
      <div className="nft-info">
        <p>{collection.title}</p>
        <p style={{fontSize: '0.8rem'}}>{collection.description}</p>
      </div>
    </div>
  );
}

export default NftCard;