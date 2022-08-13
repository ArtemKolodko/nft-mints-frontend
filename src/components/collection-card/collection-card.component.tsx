import { CollectionType } from '../../types';
import './collection-card.styles.scss';

const CollectionCard = (collection: CollectionType) => {
  return (
    <div className='nft-card-container'
      style={{
        backgroundImage: `url(${collection.collectionImage})` }}
    >
      {/*<div className="nft-info">*/}
      {/*  <p>{collection.title}</p>*/}
      {/*  <p style={{fontSize: '0.8rem'}}>{collection.description}</p>*/}
      {/*</div>*/}
    </div>
  );
}

export default CollectionCard;
