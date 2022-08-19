import { CollectionType } from '../../types';
import './collection-card.styles.scss';

interface CollectionCardProps {
    collection: CollectionType
    onClick?: () => void
}

const CollectionCard = (props: CollectionCardProps) => {
    const { collection, onClick } = props
    return (
    <div className='nft-card-container'
      onClick={onClick}
      style={{ backgroundImage: `url(${collection.collectionImage})` }}>
      {/*<div className="nft-info">*/}
      {/*  <p>{collection.title}</p>*/}
      {/*  <p style={{fontSize: '0.8rem'}}>{collection.description}</p>*/}
      {/*</div>*/}
    </div>
    );
}

export default CollectionCard;
