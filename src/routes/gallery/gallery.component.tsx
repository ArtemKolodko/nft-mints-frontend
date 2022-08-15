import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import NftCard from "../../components/nft-card/nft-card.component";
import { ApiTokenResponseType, CollectionType } from "../../types";
import { getTokensByOwner, getCollectionsByOwner, getMyTokensByCreator } from "../../utils/mint-interface/mint-inteface.utils";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import { UserProfile } from "./profile.component";
import "./gallery.styles.scss";
import { UserAccessPass } from "./access.pass.component";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import CollectionCard from "../../components/collection-card/collection-card.component";
import {getUserAccessPasses} from "../../api/client";

const GridIcon = () => <img src={gridImg} alt="Grid" />
const BasketIcon = () => <img src={basketImg} alt="Basket" />

const Gallery = () => {
  const currentUser = useSelector(selectCurrentUser);
  const checkLogin = useSelector(selectCheckLogin);

  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [tokens, setTokens] = useState<Array<ApiTokenResponseType> | null>([]);
  const [collections, setCollections] = useState<Array<CollectionType> | null>([]);
  const [accessPasses, setAccessPasses] = useState<CollectionType[]>([])

  const { ownerUuid } = useParams();
  const navigate = useNavigate();

  const loadAccessPasses = async () => {
    try {
      const data = await getUserAccessPasses(ownerUuid!)
      setAccessPasses(data)
    } catch (e) {
      console.error('Cannot get user access passes:', e)
    }
  }

  // get all my collections for gallery view
  const getCollections = async () => {
    const data = await getCollectionsByOwner(ownerUuid!)
    if (data) {
      console.log(data)
      setCollections(data)
    }
  }

  let getTokens = async () => {
    // i'm logged in and the gallery is the same as the logged in user
    // get all my tokens
    const data = await getTokensByOwner(currentUser.uuid);
    if (data) {
      console.log(data)
      setTokens(data)
    }
  }

  useEffect(() => {
    if (ownerUuid && activeTabIndex === 1) {
      loadAccessPasses()
    }
  }, [ownerUuid, activeTabIndex])

  useEffect(() => {
    if (!checkLogin.checkedLogin) {
      return; // don't get until we have checked our login
    }

    // options 1) not logged in
    // show creator gallery
    if (!currentUser) {
      getCollections();
      return;
    }

    // options 2) logged in
    // a) gallery list is same as the current user
    if (currentUser.uuid === ownerUuid) {
      // get all my collections for gallery view (if they exist, users won't have any)
      getCollections()
      // get all my tokens
    }

    // b) gallery list is not the same as the current user
    if (currentUser.uuid !== ownerUuid) {
      getCollections()

      getTokens = async () => {
        // filter tokens by the owner and creator uuid
        const data = await getMyTokensByCreator(currentUser.uuid, ownerUuid!);
        if (data) {
          console.log(data)
          setTokens(data)
        }
      }
    }

    getTokens();

  }, [ownerUuid, checkLogin.checkedLogin]);

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => setActiveTabIndex(value)

  const onClickAccessPass = (uuid: string) => navigate(`/nfts/access-pass/${uuid}`)

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
            {collections && collections.map((collection) => (
              <CollectionCard key={collection.uuid} {...collection} />
            ))}
            {tokens && tokens.map((token) => (
              <NftCard key={token.token.sequence} {...token} />
            ))}
          </div>
          <div style={{ display: activeTabIndex === 1 ? 'grid' : 'none' }}>
            {accessPasses.map(pass =>
                <UserAccessPass
                    {...pass}
                    onClick={() => onClickAccessPass(pass.uuid)}
                />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
