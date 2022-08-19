import React, { useEffect, useState } from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import NftCard from "../../components/nft-card/nft-card.component";
import {ApiTokenResponseType, CollectionType, TokenTypeEnum} from "../../types";
import {
  getCollectionsByOwnerAndType,
  getMyTokensByCreator,
  getTokensByOwner,
  getUserByUuid
} from "../../utils/mint-interface/mint-inteface.utils";
import {MyProfile} from "./profile.component";
import "./gallery.styles.scss";
import {UserAccessPass} from "./access.pass.component";
import {useSelector} from "react-redux";
import {selectCheckLogin, selectCurrentUser} from "../../store/user/user.selector";
import CollectionCard from "../../components/collection-card/collection-card.component";
import UserType from "../../types/user.types";
import GalleryTab from "../../components/gallery/gallery-tab.component";

enum GalleryTabs {
  collectibles = 'collectibles',
  accessPasses = 'accessPasses'
}

const getTabIndex = (tabName: string) => tabName === GalleryTabs.accessPasses ? 1 : 0

const Gallery = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { ownerUuid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTabName = searchParams.get('tab') || GalleryTabs.collectibles

  const [displayUser, setDisplayUser] = useState<UserType | undefined>(undefined)
  const checkLogin = useSelector(selectCheckLogin);
  const [loaded, setLoaded] = useState(false)

  const [activeTabIndex, setActiveTabIndex] = React.useState(getTabIndex(currentTabName));
  const [tokens, setTokens] = useState<Array<ApiTokenResponseType> | null>([]);
  const [collections, setCollections] = useState<Array<CollectionType> | null>([]);
  const [accessPasses, setAccessPasses] = useState<CollectionType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setActiveTabIndex(getTabIndex(currentTabName))
  }, [currentTabName])

  const loadAccessPasses = async () => {
    try {
      const data = await getCollectionsByOwnerAndType(ownerUuid!, TokenTypeEnum.ACCESS_PASS)
      console.log('data', data)
      setAccessPasses(data)
    } catch (e) {
      console.error('Cannot get user access passes:', e)
    }
  }

  // get all my collections for gallery view
  const getCollections = async () => {
    try {
      setIsLoading(true)
      const data = await getCollectionsByOwnerAndType(ownerUuid!, TokenTypeEnum.COLLECTION)
      setCollections(data)
    } catch (e) {
      console.log('Cannot load collections:', e)
    } finally {
      setIsLoading(false)
    }
  }

  let getTokens = async () => {
    // i'm logged in and the gallery is the same as the logged in user
    // get all my tokens
    try {
      setIsLoading(true)
      const data = await getTokensByOwner(currentUser.uuid);
      setTokens(data)
    } catch (e) {
      console.log('Cannot load tokens:', e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (ownerUuid && activeTabIndex === 1) {
      loadAccessPasses()
    }
    if (ownerUuid && activeTabIndex === 0) {
      getCollections()
    }
  }, [ownerUuid, activeTabIndex])

  // if owner id changed in url
  useEffect(() => {
    setLoaded(false)
  }, [ownerUuid])

  useEffect(() => {
    // fix logic; why loading many times
    if (!checkLogin.checkedLogin || loaded || activeTabIndex !== 0) {
      return; // don't get until we have checked our login
    }

    setLoaded(e => { return true })

    if (ownerUuid !== currentUser?.uuid && ownerUuid && ownerUuid !== '') {
      // empty means current user
      console.log("get user by uuid and setting display user")
      getUserByUuid(ownerUuid).then(user => setDisplayUser(user!))
    }
    else {
      setDisplayUser(currentUser)
    }
    // options 1) not logged in
    // show creator gallery
    if (!currentUser) {
      getCollections();
      return;
    }

    // options 2) logged in
    // a) gallery list is same as the current user
    if (currentUser?.uuid === ownerUuid) {
      getCollections()
      // get all my tokens
    }

    // b) gallery list is not the same as the current user
    if (currentUser.uuid !== ownerUuid) {
      getCollections()

      // eslint-disable-next-line react-hooks/exhaustive-deps
      getTokens = async () => {
        // filter tokens by the owner and creator uuid
        try {
          setIsLoading(true)
          const data = await getMyTokensByCreator(currentUser?.uuid, ownerUuid!);
          console.log(data)
          setTokens(data)
        } catch (e) {
          console.log('Cannot load filtered tokens:', e)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getTokens();

  }, [ownerUuid, checkLogin.checkedLogin]);

  useEffect(() => {
    if (ownerUuid === currentUser?.uuid) {
      setDisplayUser(currentUser) // update if the user updates
    }
  }, [ownerUuid, currentUser])

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => {
    const tabName = value === 0 ? GalleryTabs.collectibles : GalleryTabs.accessPasses
    setSearchParams({
      tab: tabName
    })
  }

  const onClickAccessPass = (uuid: string) => navigate(`/nfts/access-pass/${uuid}`)
  const onClickCollectible = (uuid: string) => navigate(`/nfts/collectible/${uuid}`)

  return (
    <div className="gallery-container" >
      <MyProfile displayUser={displayUser} canEdit={currentUser?.uuid === displayUser?.uuid} />
      <div className="gallery-grid">
        <div className={'gallery-header'}>
          <GalleryTab activeTabIndex={activeTabIndex} handleChangeTab={handleChangeTab} />
        </div>
        <div>
          <div className="gallery" style={{ display: activeTabIndex === 0 ? 'table' : 'none' }}>
            {collections && collections.map((collection) => (
              <CollectionCard key={collection.uuid} collection={collection} onClick={() => onClickCollectible(collection.uuid)} />
            ))}
            {tokens && tokens.map((token) => (
              <NftCard key={token.token.sequence} {...token} />
            ))}
          </div>
          <div className={'gallery'} style={{ display: activeTabIndex === 1 ? 'table' : 'none' }}>
            {accessPasses.map(pass =>
              <UserAccessPass
                key={pass.uuid}
                data={pass}
                onClick={() => onClickAccessPass(pass.uuid)}
              />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
