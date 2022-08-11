import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Tab, Tabs} from "@mui/material";
import NftCard from "../../components/nft-card/nft-card.component";
import { ApiTokenResponseType } from "../../types";
import {getTokensByOwner} from "../../utils/mint-interface/mint-inteface.utils";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import {UserProfile} from "./profile.component";
import "./gallery.styles.scss";
import {UserAccessPass, UserAccessPassProps} from "./access.pass.component";

const GridIcon = () => <img src={gridImg} alt="Grid" />
const BasketIcon = () => <img src={basketImg} alt="Basket" />

const defaultAccessPass: UserAccessPassProps = {
  title: 'A$AP Rocky',
  description: 'After Show Meet and Greet Pass'
}

const Gallery = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [ tokens, setTokens ] = useState<Array<ApiTokenResponseType> | null>([]);
  const [accessPasses, setAccessPasses] = useState([defaultAccessPass])

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
            <div className="gallery" style={{ display: activeTabIndex === 0 ? 'grid': 'none' }}>
              { tokens && tokens.map((token) => (
                  <NftCard key={token.token.sequence} {...token} />
              ))}
            </div>
            <div style={{ display: activeTabIndex === 1 ? 'grid': 'none' }}>
              {accessPasses.map(pass => <UserAccessPass {...pass} />)}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Gallery;
