import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CollectionType } from "../../types";
import gridImg from "../../assets/imgs/grid.svg";
import basketImg from "../../assets/imgs/basket.svg";
import "./access-pass-details.styles.scss";
import { useSelector } from "react-redux";
import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import ticketLogoSample from "../../assets/imgs/pass-logo-sample.png";
import ticketBack from "../../assets/imgs/ticket_background.svg";
import {getAccessPassById} from "../../api/client";
import QR from "../../assets/imgs/qrSample.svg";
import {Button} from "@mui/material";

const AccessPassDetailsCard = (props: { data: CollectionType }) => {
    const { data: { title, rate, description } } = props

    return <div className={'access-pass-container'} style={{backgroundImage: `url(${ticketBack})`}}>
        <div className={'access-pass-header'}>
            <div>${rate}</div>
        </div>
        <div className={'access-pass-info'}>
            <div className={'access-pass-logo'} style={{backgroundImage: `url(${ticketLogoSample})`}} />
            <div className={'access-pass-title'}>
                {title}
            </div>
            <div className={'access-pass-location'}>
                <div className={'access-pass-location-line'}>
                    <div>Oracle Arena</div>
                    <div>21+</div>
                </div>
                <div className={'access-pass-location-line'}>
                    <div>Oakland, CA</div>
                    <div>12/11/22</div>
                </div>
            </div>
            <div className={'access-pass-details'}>
                <div className={'access-pass-details-description'}>
                    {description}
                </div>
                <div style={{ textAlign: 'left' }}>
                    A$AP Mob Tour: This pass will get you exclusive access to meet the band and get autographs. Additionally, you will be able to claim a special merch bundle upon arrival. Present this ticket at the door when you arrive.
                </div>
            </div>
            {/*<div className={'access-pass-details-button'}>*/}
            {/*    More Details*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <a href={'https://www.instagram.com/asaprocky'} target='_blank' rel="noreferrer">*/}
            {/*        <img src={QR} width={'200px'} height={'200px'} alt="QR Sample" />*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    </div>
}

const AccessPassDetails = () => {
    const currentUser = useSelector(selectCurrentUser);
    const checkLogin = useSelector(selectCheckLogin);

    const { uuid = 'test-uuid' } = useParams();
    const [accessPass, setAccessPass] = useState<CollectionType>()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const loadAccessPass = async () => {
            setIsLoading(true)
            try {
                const data = await getAccessPassById(uuid)
                setAccessPass(data)
            } catch (e) {
                console.error('Cannot get access pass:', e)
            } finally {
                setIsLoading(false)
            }
        }
        loadAccessPass()
    }, [uuid])

    return (
        <div className={'access-pass-details-container'}>
            <div className={'access-pass-details-wrapper'}>
                <div className={'header'}>
                    <FontAwesomeIcon icon={faClose} size={'2x'} />
                </div>
                <div className={'title'}>Access Pass</div>
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
