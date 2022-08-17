import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NftCard from "../../components/nft-card/nft-card.component";
import { ApiTokenResponseType, CollectionType } from "../../types";
import { getTokensByOwner, getMyCollections, getCollectionsByOwner, getMyTokensByCreator, getUserByUuid } from "../../utils/mint-interface/mint-inteface.utils";
import { UserProfile } from "./profile.component";
import "./gallery.styles.scss";
import { UserAccessPass } from "./access.pass.component";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import CollectionCard from "../../components/collection-card/collection-card.component";
import {getUserAccessPasses} from "../../api/client";
import UserType from "../../types/user.types";
import GalleryTab from "../../components/gallery/gallery-tab.component";

// const defaultAccessPass: UserAccessPassProps = {
//   title: 'A$AP Rocky',
//   description: 'After Show Meet and Greet Pass'
// }

const Gallery = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [displayUser, setDisplayUser] = useState<UserType | undefined>(undefined)
  const checkLogin = useSelector(selectCheckLogin);
  const [loaded, setLoaded] = useState(false)

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
    // a) gallery list is same as the current user
    if (currentUser.uuid === ownerUuid) {
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

    if (ownerUuid !== currentUser.uuid && ownerUuid && ownerUuid !== '') {
      // empty means current user
      getUserByUuid(ownerUuid).then(user => setDisplayUser(user!))
    }
    else {
      setDisplayUser(currentUser)
    }

  }, [ownerUuid, checkLogin.checkedLogin]);

  useEffect(() => {
    if (ownerUuid === currentUser?.uuid) {
      setDisplayUser(currentUser) // update if the user updates
    }
  }, [ownerUuid, currentUser])

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => setActiveTabIndex(value)

  const onClickAccessPass = (uuid: string) => navigate(`/nfts/access-pass/${uuid}`)
  const onClickCollectible = (uuid: string) => navigate(`/nfts/collectible/${uuid}`)

  return (
    <div>
      <UserProfile displayUser={displayUser} canEdit={currentUser.uuid === displayUser?.uuid}/>
      <div className="gallery-container">
        <div className={'gallery-header'}>
          <GalleryTab activeTabIndex={activeTabIndex} handleChangeTab={handleChangeTab} />
        </div>
        <div style={{ marginTop: '0.8em', margin: '8px', padding:"8px"}}>
          <div className="gallery" style={{ display: activeTabIndex === 0 ? 'table' : 'none' }}>
            {collections && collections.map((collection) => (
              <CollectionCard key={collection.uuid} collection={collection} onClick={() => onClickCollectible(collection.uuid)} />
            ))}
            {tokens && tokens.map((token) => (
              <NftCard key={token.token.sequence} {...token} />
            ))}
          </div>
          <div style={{ display: activeTabIndex === 1 ? 'grid' : 'none' }}>
            {accessPasses.map(pass =>
                <UserAccessPass
                    key={pass.uuid}
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
