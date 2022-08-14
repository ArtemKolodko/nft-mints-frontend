import React, { useEffect, useState } from "react";
import "./profile.styles.scss";
import editImg from "../../assets/imgs/edit.svg";
import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useParams } from "react-router";
import { updateUser } from "../../utils/mint-interface/mint-inteface.utils";

const defaultProfile = {
    name: 'Username',
    publicLink: '@username'
}

export const UserProfile = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { ownerUuid } = useParams();

    const [username, setUsername] = useState(currentUser?.name);
    const [publicLink, setPublicLink] = useState(currentUser?.publicLink);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.name);
            setPublicLink(currentUser.publicLink);
        }
    }, [currentUser]);

    const update = async () => {
        if (edit && username?.length > 0 || publicLink?.length > 0) {
            await updateUser({ name: username, publicLink })
        }
        setEdit(!edit)
    }
    // should have a tick image when editing

    return <div className={'profile-container'}>
        <div className={'profile-image-container'}>
            <div className={'profile-img'} style={{ backgroundImage: `url(${uploadImageImg})` }} />
            <div className={'dj3n-logo'} style={{ backgroundImage: `url(${dj3nImg})` }} />
            <div className={'profile-image-bg'} style={{ backgroundImage: `url(${uploadImageImg})` }} />
        </div>
        <div className={'profile-info-container'}>
            {!edit && <div>
                <div className={'profile-title'}>{username || 'Username'}</div>
                <div>{publicLink || '@username'}</div>
            </div>}
            {edit && <div>
                <div className={'profile-title'}><input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' /></div>
                <div><input type='text' value={publicLink} onChange={e => setPublicLink(e.target.value)} placeholder='@username' /></div>
            </div>}
            <div>
                {(ownerUuid === currentUser.uuid || !ownerUuid) && <img src={editImg} width={'28px'} alt={'Edit'} onClick={update} />}
            </div>
        </div>
    </div>
}
