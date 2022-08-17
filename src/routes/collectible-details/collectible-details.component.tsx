import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CollectionType } from "../../types";
import "./collectible-details.styles.scss";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import {Button} from "@mui/material";
import {getCollection, getUserByUuid} from "../../utils/mint-interface/mint-inteface.utils";
import UserType from "../../types/user.types";

const CollectibleDetails = () => {
    const currentUser = useSelector(selectCurrentUser);
    const checkLogin = useSelector(selectCheckLogin);
    const navigate = useNavigate();

    const { uuid = 'test-uuid' } = useParams();
    const [collection, setCollection] = useState<CollectionType>()
    const [owner, setOwner] = useState<UserType>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const loadCollectibleOwner = async (ownerUuid: string) => {
            try {
                const data = await getUserByUuid(ownerUuid)
                console.log('Collection Owner:', data)
                if(data) {
                    setOwner(data)
                }
            } catch (e) {
                console.log('Cannot load collection owner:', e)
            }
        }

        const loadCollectible = async () => {
            console.log('loadAccessPass', uuid)
            setIsLoading(true)
            try {
                const data = await getCollection(uuid)
                console.log('Collection:', data)
                if (data) {
                    setCollection(data)
                    await loadCollectibleOwner(data.ownerUUID)
                }
            } catch (e) {
                console.error('Cannot get collectible:', e)
            } finally {
                setIsLoading(false)
            }
        }

        loadCollectible()
    }, [uuid])

    const onCloseClick = () => {
        if (collection) {
            navigate(`/nfts/gallery/${collection.ownerUUID}`)
        }
    }

    return (
        <div className={'collectible-details-container'}>
            <div className={'collectible-details-header'}>
                <FontAwesomeIcon icon={faClose} size={'2x'} onClick={onCloseClick} />
            </div>
            <div className={'collectible-details-wrapper'}>
                <div style={{ marginTop: '16px' }}>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && collection &&
                        <div>
                            <div className={'collectible-details-title'}>{collection.title}</div>
                            <div className={'collectible-details-image-container'}>
                                <img src={collection.collectionImage} width={'100%'} height={'100%'} alt='Collectible' />
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                <div className={'collectible-details-owner'}>Owned by {owner ? owner.name : '-'}</div>
                                <div className={'collectible-details-price'}>${collection.rate}.00</div>
                                <div style={{ marginTop: '16px' }}>
                                    <Button variant="contained" fullWidth={true}>Buy now</Button>
                                </div>
                            </div>
                            <div className={'collectible-details-info'}>
                                <div>Description: {collection.description || '-'}</div>
                                <div>Transfer Royalty: {collection.creatorRoyalties}%</div>
                                <div>Contract: {collection.collectionAddress || '-'}</div>
                                {owner &&
                                    <div>Owner: {owner.name || owner.walletAddress}</div>
                                }
                            </div>
                        </div>
                    }
                    {!isLoading && !collection &&
                        <div>Error on loading access pass</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CollectibleDetails;
