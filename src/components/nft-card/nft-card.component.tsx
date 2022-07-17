import './nft-card.styles.scss';

type NftCardProps = {
  name: string,
  imgUrl : string,
  description: string,
  tokenId: string
}

const NftCard = (props: NftCardProps) => {
  const { name, imgUrl, description } = props;
  return (
    <div className='nft-card-container' 
      style={{ 
        backgroundImage: `url(${imgUrl})` }}
    >
      <div className="nft-info">
        <p>{name}</p>
        <p style={{fontSize: '0.8rem'}}>{description}</p>
      </div>
    </div>
  );
}

export default NftCard;