import React, { useState } from "react";
import "./profile.styles.scss";
import editImg from "../../assets/imgs/edit.svg";
import uploadImageImg from "../../assets/imgs/upload-image.svg";
import dj3nImg from "../../assets/imgs/dj3n_logo.svg";

const defaultProfile = {
    name: 'Username',
    publicLink: '@username'
}

export const UserProfile = () => {
    const [ profile, setProfile ] = useState(defaultProfile); // TODO: get profile from backend

    return <div className={'profile-container'}>
        <div className={'profile-image-container'}>
            <div className={'profile-img'} style={{ backgroundImage: `url(${uploadImageImg})` }} />
            <div className={'dj3n-logo'} style={{ backgroundImage: `url(${dj3nImg})` }} />
            <div className={'profile-image-bg'} style={{ backgroundImage: `url(${uploadImageImg})` }} />
        </div>
        <div className={'profile-info-container'}>
            <div>
                <div className={'profile-title'}>{profile.name}</div>
                <div>{profile.publicLink}</div>
            </div>
            <div>
                <img src={editImg} width={'28px'} alt={'Edit'} />
            </div>
        </div>
    </div>
}
