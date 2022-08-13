import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import NftCard from "../../components/nft-card/nft-card.component";
import { ApiTokenResponseType, CollectionType } from "../../types";
import { getTokensByOwner, getMyCollections } from "../../utils/mint-interface/mint-inteface.utils";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import { UserProfile } from "./profile.component";
import "./gallery.styles.scss";
import { UserAccessPass, UserAccessPassProps } from "./access.pass.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import CollectionCard from "../../components/collection-card/collection-card.component";

const GridIcon = () => <img src={gridImg} alt="Grid" />
const BasketIcon = () => <img src={basketImg} alt="Basket" />

const defaultAccessPass: UserAccessPassProps = {
  title: 'A$AP Rocky',
  description: 'After Show Meet and Greet Pass'
}

const Gallery = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [tokens, setTokens] = useState<Array<ApiTokenResponseType> | null>([]);
  const [collections, setCollections] = useState<Array<CollectionType> | null>([]);
  const [accessPasses, setAccessPasses] = useState([defaultAccessPass])

  const { ownerUuid } = useParams();

  useEffect(() => {
    if (currentUser.uuid === ownerUuid) {
      // get all my collections for gallery view
      const getCollections = async () => {
        const data = await getMyCollections()
        if (data) {
          console.log(data)
          setCollections(data)
        }
      }

      getCollections()

    }
    if (currentUser.uuid !== ownerUuid) {
      const getTokens = async () => {
        const data = await getTokensByOwner(ownerUuid!);
        if (data) {
          console.log(data)
          setTokens(data)
        }
      }
      getTokens();
    }

  }, [ownerUuid]);

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => setActiveTabIndex(value)

  return (
    <div>
      <UserProfile />
      <div className="gallery-container">
        <div className={'gallery-header'}>
          <Tabs value={activeTabIndex} onChange={handleChangeTab} aria-label="icon tabs example">
            <Tab icon={<GridIcon />} aria-label="phone" />
            <Tab icon={<BasketIcon />} aria-label="favorite" />
          </Tabs>
        </div>
        <div style={{ marginTop: '16px' }}>
          <div className="gallery" style={{ display: activeTabIndex === 0 ? 'grid' : 'none' }}>
            {tokens && tokens.map((token) => (
              <NftCard key={token.token.sequence} {...token} />
            ))}
            {collections && collections.map((collection) => (
              <CollectionCard key={collection.uuid} {...collection} />
            ))}
          </div>
          <div style={{ display: activeTabIndex === 1 ? 'grid' : 'none' }}>
            {accessPasses.map(pass => <UserAccessPass {...pass} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
