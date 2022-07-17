import NftCard from "../../components/nft-card/nft-card.component";
import "./gallery.styles.scss";
import MockftList from "./gallery.data";

const Gallery = () => {
  return (
    <div className="gallery-container">
      <div className="gallery-menu"></div>
      <div className="gallery">
        {MockftList.map((nft) => (
          <NftCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
