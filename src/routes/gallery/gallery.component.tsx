import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import NftCard from "../../components/nft-card/nft-card.component";
import { ApiTokenResponseType, CollectionType } from "../../types";
import { getTokensByOwner, getMyCollections, getCollectionsByOwner, getMyTokensByCreator, getUserByUuid } from "../../utils/mint-interface/mint-inteface.utils";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import { UserProfile } from "./profile.component";
import "./gallery.styles.scss";
import { UserAccessPass, UserAccessPassProps } from "./access.pass.component";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import CollectionCard from "../../components/collection-card/collection-card.component";
import UserType from "../../types/user.types";

const GridIcon = () => <img src={gridImg} alt="Grid" />
const BasketIcon = () => <img src={basketImg} alt="Basket" />

const defaultAccessPass: UserAccessPassProps = {
  title: 'A$AP Rocky',
  description: 'After Show Meet and Greet Pass'
}

const Gallery = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [displayUser, setDisplayUser] = useState<UserType | undefined>(undefined)
  const checkLogin = useSelector(selectCheckLogin);
  const [loaded, setLoaded] = useState(false)

  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [tokens, setTokens] = useState<Array<ApiTokenResponseType> | null>([]);
  const [collections, setCollections] = useState<Array<CollectionType> | null>([]);
  const [accessPasses, setAccessPasses] = useState([defaultAccessPass])

  const { ownerUuid } = useParams();

  useEffect(() => {
    // fix logic; why loading many times
    if (!checkLogin.checkedLogin || loaded) {
      return; // don't get until we have checked our login
    }

    setLoaded(e=>{return true})

    // options 1) not logged in
    // show creator gallery
    if (!currentUser) {
      const getCollections = async () => {
        const data = await getCollectionsByOwner(ownerUuid!);
        if (data) {
          console.log(data);
          setCollections(data);
        }
      }

      getCollections();
      return;
    }

    // options 2) logged in

    let getTokens = async () => {
      // i'm logged in and the gallery is the same as the logged in user
      // get all my tokens
      const data = await getTokensByOwner(currentUser.uuid);
      if (data) {
        console.log(data)
        setTokens(data)
      }
    }
    // a) gallery list is same as the current user
    if (currentUser.uuid === ownerUuid) {
      // get all my collections for gallery view (if they exist, users won't have any)
      const getCollections = () => {
        console.log('fetching my collections')
        getMyCollections().then(data => {
          if (data) {
            console.log(data)
            setCollections(data)
          }
        }).catch(e => console.log(e))
      }

      getCollections()
      // get all my tokens
    }

    // b) gallery list is not the same as the current user
    if (currentUser.uuid !== ownerUuid) {
      // get all my collections for gallery view
      const getCollections = async () => {
        const data = await getCollectionsByOwner(ownerUuid!)
        if (data) {
          console.log(data)
          setCollections(data)
        }
      }

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

    if (ownerUuid !== currentUser.uuid && ownerUuid && ownerUuid !== '') {
      // empty means current user
      getUserByUuid(ownerUuid).then(user => setDisplayUser(user!))
    }
    else {
      setDisplayUser(currentUser)
    }

  }, [ownerUuid, checkLogin.checkedLogin]);

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => setActiveTabIndex(value)

  return (
    <div>
      <UserProfile displayUser={displayUser} currentUuid={currentUser.uuid}/>
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
            {accessPasses.map(pass => <UserAccessPass {...pass} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
