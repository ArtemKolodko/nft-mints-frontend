import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CollectionType } from "../../types";
import "./access-pass-details.styles.scss";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import QR from "../../assets/imgs/qrSample.svg";
import {Button} from "@mui/material";
import {getCollection} from "../../utils/mint-interface/mint-inteface.utils";

const AccessPassDetailsCard = (props: { data: CollectionType }) => {
    const { data: {
        title, rate, description, additionalDetails,
        collectionImage, collectionImages,
        link,
        properties = {} as any,
    }} = props

    const { age = '18', venue, city, state } = properties

    const [isDetailsOpened, setDetailsOpened] = useState(false)

    return <div className={'access-pass-container'}>
        <div className={'access-pass-header'}>
            <div style={{ padding: '8px' }}>${rate}</div>
        </div>
        <div className={'access-pass-content'}>
            <div style={{ padding: '0 8px 8px'}}>
                <div className={'access-pass-info'}>
                    <div className={'access-pass-logo'} style={{backgroundImage: `url(${collectionImage})`}} />
                    <div className={'access-pass-title'}>
                        {title}
                    </div>
                    <div className={'access-pass-location'}>
                        <div className={'access-pass-location-line'}>
                            <div>{venue}</div>
                            <div>{age}+</div>
                        </div>
                        <div className={'access-pass-location-line'}>
                            <div>{city}, {state}</div>
                            <div>{'Add date here'}</div>
                        </div>
                    </div>
                    <div className={'access-pass-details'}>
                        <div className={'access-pass-details-description'}>{description}</div>
                        <div className={'access-pass-details-additional'}>{additionalDetails}</div>
                    </div>
                    <div className={'access-pass-details-button'} onClick={() => setDetailsOpened(!isDetailsOpened)}>
                        {!isDetailsOpened ? 'More Details' : 'Hide Details'}
                    </div>
                    {isDetailsOpened &&
                        <div style={{ marginTop: '8px' }}>
                            <a href={link} target='_blank' rel="noreferrer">
                                <img src={QR} width={'200px'} height={'200px'} alt="QR Sample" />
                            </a>
                        </div>
                    }
                </div>
            </div>
        </div>
        <div className={'access-pass-footer'} />
    </div>
}

const AccessPassDetails = () => {
    const currentUser = useSelector(selectCurrentUser);
    const checkLogin = useSelector(selectCheckLogin);
    const navigate = useNavigate();

    const { uuid = 'test-uuid' } = useParams();
    const [accessPass, setAccessPass] = useState<CollectionType>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const loadAccessPass = async () => {
            setIsLoading(true)
            try {
                const data = await getCollection(uuid)
                console.log('data', data)
                setAccessPass(data)
            } catch (e) {
                console.error('Cannot get access pass:', e)
            } finally {
                setIsLoading(false)
            }
        }
        loadAccessPass()
    }, [uuid])

    const onCloseClick = () => {
        if (accessPass) {
            navigate(`/nfts/gallery/${accessPass.ownerUUID}?tab=accessPasses`)
        }
    }

    return (
        <div className={'access-pass-details-container'}>
            <div className={'access-pass-details-header'}>
                <FontAwesomeIcon icon={faClose} size={'2x'} onClick={onCloseClick} />
            </div>
            <div className={'access-pass-details-wrapper'}>
                <div className={'access-pass-details-title'}>Access Pass</div>
                <div style={{ marginTop: '16px' }}>
                    {isLoading && <div>Loading...</div>}
                    {!isLoading && accessPass &&
                        <div>
                            <AccessPassDetailsCard data={accessPass} />
                            <div style={{ marginTop: '8px' }}>
                                <div className={'access-pass-owner'}>Owned by @asaprocky</div>
                                <div className={'access-pass-price'}>${accessPass.rate}.00</div>
                                <div style={{ marginTop: '16px' }}>
                                    <Button variant="contained" fullWidth={true}>Buy now</Button>
                                </div>
                            </div>
                        </div>
                    }
                    {!isLoading && !accessPass &&
                        <div>Error on loading access pass</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AccessPassDetails;
